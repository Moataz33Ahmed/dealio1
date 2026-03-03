import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrdersService, BuyerOrder } from '../../core/services/orders.service';
import { OrderProductService, Product } from '../../core/services/order-product.service';
import { DeleteOrderService } from '../../core/services/delete-order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  imports: [CommonModule]
})
export class OrdersComponent implements OnInit {
  orders: BuyerOrder[] = [];
  productsMap: { [productId: number]: Product } = {};
  isLoading = true;
  errorMsg = '';
  deletingOrderId: number | null = null;
  deleteMsg: string = '';

  constructor(
    private ordersService: OrdersService,
    private orderProductService: OrderProductService,
    private deleteOrderService: DeleteOrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ordersService.getBuyerOrders().subscribe({
      next: (res) => {
        this.orders = res.data;
        this.isLoading = false;
        const uniqueProductIds = Array.from(new Set(this.orders.map(o => o.productId)));
        uniqueProductIds.forEach(productId => {
          this.orderProductService.getProductById(productId).subscribe({
            next: (productRes) => {
              this.productsMap[productId] = productRes.data;
            },
            error: () => {
              this.productsMap[productId] = {
                id: productId,
                name: 'Unknown product',
                description: '',
                price: 0,
                status: 'Unavailable',
                sellerId: '',
                categoryId: 0,
                images: []
              };
            }
          });
        });
      },
      error: () => {
        this.errorMsg = 'Failed to load orders.';
        this.isLoading = false;
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return '#f59e42';
      case 'processing': return '#2563eb';
      case 'shipped': return '#0ea5e9';
      case 'delivered': return '#16a34a';
      case 'cancelled': return '#ef4444';
      default: return '#64748b';
    }
  }

  getOrderTotal(order: BuyerOrder): number {
    const product = this.productsMap[order.productId];
    return product ? product.price : 0;
  }

  payOrder(order: BuyerOrder) {
    this.router.navigate(['/buyer-payment'], {
      queryParams: {
        buyerId: order.buyerId,
        orderId: order.id,
        paymentMethod: 'card',
        cardInfo: ''
      }
    });
  }

  deleteOrder(order: BuyerOrder) {
    this.deletingOrderId = order.id;
    this.deleteOrderService.deleteOrder(order.id).subscribe({
      next: (res) => {
        if (res?.statusCode === 200) {
          this.orders = this.orders.filter(o => o.id !== order.id);
          this.deleteMsg = 'Order deleted successfully!';
        } else {
          this.deleteMsg = res?.message || 'Failed to delete order!';
        }
        setTimeout(() => this.deleteMsg = '', 3000);
        this.deletingOrderId = null;
      },
      error: () => {
        this.deleteMsg = 'Failed to delete order!';
        setTimeout(() => this.deleteMsg = '', 3000);
        this.deletingOrderId = null;
      }
    });
  }

  getProductImage(product: Product): string {
    if (!product.images || !product.images.length) return '/assets/products/no-image.png';
    if (product.images[0].startsWith('http')) return product.images[0];
    return `http://localhost:5064/uploads/${product.images[0]}`;
  }
}