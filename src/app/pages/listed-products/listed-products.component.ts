import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Product, SellerProductService } from '../../core/services/seller-product.service';
import { UpdateProductService, UpdateProductPayload } from '../../core/services/update-product.service';

@Component({
  selector: 'app-listed-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listed-products.component.html',
  styleUrls: ['./listed-products.component.scss'],
})
export class ListedProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  errorMsg = '';
  showEditModal = false;
  showDeleteModal = false;
  selectedProduct: Product | null = null;
  orderErrorMsg = '';

  categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothes' },
    { id: 3, name: 'Books' },
    { id: 4, name: 'Other' }
  ];

  constructor(
    private sellerProductService: SellerProductService,
    private updateProductService: UpdateProductService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.sellerProductService.getProductsByUser().subscribe({
      next: res => {
        this.products = res.statusCode === 200 ? res.data : [];
        this.errorMsg = res.statusCode === 200 ? '' : 'Failed to load products';
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load products';
        this.isLoading = false;
      }
    });
  }

  onEdit(product: Product) {
    this.selectedProduct = { ...product };
    this.showEditModal = true;
    this.orderErrorMsg = '';
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedProduct = null;
    this.orderErrorMsg = '';
  }

  saveEdit(form: NgForm) {
    if (!this.selectedProduct || form.invalid) return;

    const updatePayload: UpdateProductPayload = {
      ProductId: this.selectedProduct.id,
      Name: this.selectedProduct.name,
      Description: this.selectedProduct.description,
      Price: this.selectedProduct.price,
      CategoryId: this.selectedProduct.categoryId
    };

    this.updateProductService.updateProduct(updatePayload).subscribe({
      next: res => {
        if (res.message === "This product has already been ordered and cannot be edited.") {
          this.orderErrorMsg = res.message;
          this.showEditModal = false;
          setTimeout(() => this.orderErrorMsg = '', 4000);
          return;
        }
        if (res.statusCode === 200) {
          const idx = this.products.findIndex(p => p.id === this.selectedProduct!.id);
          if (idx > -1) this.products[idx] = { ...this.selectedProduct! };
          this.closeEditModal();
        } else {
          alert('Update failed!');
        }
      },
      error: () => {
        alert('Server error!');
      }
    });
  }

  onDelete(product: Product) {
    this.selectedProduct = product;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedProduct = null;
  }

  confirmDelete() {
    if (this.selectedProduct) {
      this.products = this.products.filter(p => p.id !== this.selectedProduct!.id);
    }
    this.closeDeleteModal();
  }
}