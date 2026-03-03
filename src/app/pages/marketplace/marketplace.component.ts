import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../core/services/product.service';
import { ProductByCategoryService } from '../../core/services/product-by-category.service';
import { AddOrderService } from '../../core/services/add-order.service'; 
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ]
})
export class MarketplaceComponent implements OnInit {
  displayedProducts: any[] = [];
  allProducts: any[] = [];
  isLoading = false;

  selectedCategory: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;

  categories: { id: number, name: string }[] = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothes' },
    { id: 3, name: 'Books' },
    { id: 4, name: 'Other' },
  ];

  alertMsg: string = '';
  alertType: 'success' | 'error' = 'error';
  showBannerAlert: boolean = false;

  constructor(
    private productService: ProductService,
    private productByCategoryService: ProductByCategoryService,
    private snackBar: MatSnackBar,
    private addOrderService: AddOrderService
  ) {}

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.isLoading = true;
    this.productService.getAllProducts()
      .subscribe({
        next: (res) => {
          this.allProducts = res.data;
          this.applyPriceFilter();
          this.isLoading = false;
        },
        error: () => {
          this.snackBar.open('Error loading products!', 'Close', { duration: 2500 });
          this.isLoading = false;
        }
      });
  }

  onCategoryChange() {
    if (typeof this.selectedCategory === 'number') {
      this.isLoading = true;
      this.productByCategoryService.getProductsByCategory(this.selectedCategory)
        .subscribe({
          next: (res: any) => {
            this.allProducts = res.data;
            this.applyPriceFilter();
            this.isLoading = false;
          },
          error: () => {
            this.snackBar.open('Error loading products!', 'Close', { duration: 2500 });
            this.isLoading = false;
          }
        });
    } else {
      this.loadAllProducts();
    }
  }

  applyPriceFilter() {
    this.displayedProducts = this.allProducts.filter(product => {
      let pass = true;
      if (this.minPrice !== null && this.minPrice !== undefined) {
        pass = pass && product.price >= this.minPrice;
      }
      if (this.maxPrice !== null && this.maxPrice !== undefined) {
        pass = pass && product.price <= this.maxPrice;
      }
      return pass;
    });
  }

  getImageUrl(img: string): string {
    return img ? img : 'https://placehold.co/400x300?text=No+Image';
  }

  onImgError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://placehold.co/400x300?text=No+Image';
  }

  getCategoryName(id: number): string {
    const cat = this.categories.find(c => c.id === id);
    return cat ? cat.name : 'Other';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0
    }).format(price);
  }

  orderNow(product: any) {
    this.addOrderService.addToCart(product.id).subscribe({
      next: (res) => {
        if (res?.message === "Seller and buyer cannot be the same") {
          this.alertMsg = "Seller and buyer cannot be the same";
          this.alertType = "error";
          this.showBannerAlert = true;
          setTimeout(() => this.closeBannerAlert(), 4000);
        } else if (res?.message === "Order created successfully") {
          this.alertMsg = "Order created successfully";
          this.alertType = "success";
          this.showBannerAlert = true;
          setTimeout(() => this.closeBannerAlert(), 4000);
        } else if (res?.statusCode === 200) {
          this.snackBar.open(`${product.name} ordered successfully!`, 'Close', { duration: 2000 });
        } else if (res?.message) {
          this.snackBar.open(res.message, 'Close', { duration: 2000 });
        } else {
          this.snackBar.open('Could not place order!', 'Close', { duration: 2000 });
        }
      },
      error: (err) => {
        if (err?.error?.message === "Seller and buyer cannot be the same") {
          this.alertMsg = "Seller and buyer cannot be the same";
          this.alertType = "error";
          this.showBannerAlert = true;
          setTimeout(() => this.closeBannerAlert(), 2000);
        } else {
          const errMsg = err?.error?.message ?? 'Failed to place order!';
          this.snackBar.open(errMsg, 'Close', { duration: 2800 });
        }
      }
    });
  }

  closeBannerAlert() {
    this.showBannerAlert = false;
    this.alertMsg = '';
  }
}