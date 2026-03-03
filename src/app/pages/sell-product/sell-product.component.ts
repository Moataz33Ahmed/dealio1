import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { SellProductService } from '../../core/services/sell-product.service';

@Component({
  selector: 'app-sell-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.scss']
})
export class SellProductComponent {
  categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothes' },
    { id: 3, name: 'Books' },
    { id: 4, name: 'Other' }
  ];
  selectedFiles: File[] = [];
  isLoading = false;
  successMsg = '';
  errorMsg = '';

  product = {
    name: '',
    description: '',
    categoryId: '',
    price: '',
    images: null as File[] | null
  };

  fieldErrors = {
    name: false,
    description: false,
    categoryId: false,
    price: false,
    images: false
  };

  constructor(private sellProductService: SellProductService) {}

  handleFileInput(files: FileList | null) {
    if (files && files.length > 0) {
      this.selectedFiles = Array.from(files);
      this.product.images = this.selectedFiles;
      this.fieldErrors.images = false;
    } else {
      this.selectedFiles = [];
      this.product.images = null;
      this.fieldErrors.images = true;
    }
  }

  validateFields(form: NgForm): boolean {
    this.fieldErrors.name = !this.product.name;
    this.fieldErrors.description = !this.product.description;
    this.fieldErrors.categoryId = !this.product.categoryId;
    this.fieldErrors.price = !this.product.price || Number(this.product.price) < 1;
    this.fieldErrors.images = !this.selectedFiles.length;
    return !(this.fieldErrors.name || this.fieldErrors.description || this.fieldErrors.categoryId || this.fieldErrors.price || this.fieldErrors.images || form.invalid);
  }

  resetProductFields(form: NgForm) {
    this.product = {
      name: '',
      description: '',
      categoryId: '',
      price: '',
      images: null
    };
    this.selectedFiles = [];
    form.resetForm();
  }

  onSubmit(form: NgForm) {
    this.successMsg = '';
    this.errorMsg = '';
    if (!this.validateFields(form)) return;

    const formData = new FormData();
    formData.append('Name', this.product.name);
    formData.append('Description', this.product.description);
    formData.append('CategoryId', this.product.categoryId);
    formData.append('Price', this.product.price);

    for (const file of this.selectedFiles) {
      formData.append('Images', file, file.name);
    }

    this.isLoading = true;
    this.sellProductService.createProduct(formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMsg = '✅ Product added successfully!';
        this.resetProductFields(form);
      },
      error: () => {
        this.isLoading = false;
        this.errorMsg = '❌ Error while adding the product!';
      }
    });
  }
}