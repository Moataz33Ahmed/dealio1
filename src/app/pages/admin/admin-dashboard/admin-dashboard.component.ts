import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { DeliveryProfileService, DeliveryProfileRequest } from '../../../core/services/delivery-profile.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ]
})
export class AdminDashboardComponent {
  showForm = false;
  deliveryForm;
  imageFile: File | null = null;
  isLoading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private deliveryService: DeliveryProfileService
  ) {
    this.deliveryForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      NationalId: ['', [Validators.required, Validators.pattern(/^[0-9]{14}$/)]],
      Image: [null, Validators.required],
      Phone: ['', [Validators.required, Validators.pattern(/^(01)[0-9]{9}$/)]],
      City: ['', Validators.required],
      Region: ['', Validators.required],
      Street: ['', Validators.required]
    });
  }

  openForm() {
    this.showForm = true;
    this.successMsg = '';
    this.errorMsg = '';
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.deliveryForm.patchValue({ Image: file });
    }
  }

  submit() {
    if (this.deliveryForm.invalid) {
      this.errorMsg = 'Please fill all fields correctly.';
      this.successMsg = '';
      return;
    }
    this.errorMsg = '';
    this.isLoading = true;

    const formValue = this.deliveryForm.value;
    const formData: DeliveryProfileRequest = {
      FirstName: formValue.FirstName ?? '',
      LastName: formValue.LastName ?? '',
      NationalId: formValue.NationalId ?? '',
      Image: this.imageFile,
      Phone: formValue.Phone ?? '',
      City: formValue.City ?? '',
      Region: formValue.Region ?? '',
      Street: formValue.Street ?? ''
    };

    this.deliveryService.createDeliveryProfile(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMsg = res.message || 'Delivery profile added successfully!';
        this.deliveryForm.reset();
        this.imageFile = null;
        setTimeout(() => {
          this.successMsg = '';
          this.showForm = false;
        }, 1800);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err.error?.message || 'Error while adding delivery profile.';
      }
    });
  }
}