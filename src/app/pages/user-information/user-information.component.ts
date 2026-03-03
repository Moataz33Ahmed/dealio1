import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserProfileService } from '../../core/services/user-profile.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class UserInformationComponent {
  profileForm: FormGroup;
  imgPreview: string | null = null;
  successMsg = '';
  errorMsg = '';
  isSubmitting = false;

  constructor(private fb: FormBuilder, private userProfileService: UserProfileService) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: ['', [Validators.required]],
      region: ['', [Validators.required]],
      street: ['', [Validators.required]],
      image: [null]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.profileForm.patchValue({ image: file });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.imgPreview = reader.result as string;
      reader.readAsDataURL(file);
    } else {
      this.imgPreview = null;
    }
  }

  get f() { return this.profileForm.controls; }

  createProfile() {
    this.successMsg = '';
    this.errorMsg = '';
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const formValue = this.profileForm.value;
    this.userProfileService.createUserProfile({
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      phone: formValue.phone,
      city: formValue.city,
      region: formValue.region,
      street: formValue.street,
      image: formValue.image
    }).subscribe({
      next: () => {
        this.successMsg = 'Profile created successfully!';
        this.profileForm.reset();
        this.imgPreview = null;
        this.isSubmitting = false;
      },
      error: err => {
        this.errorMsg = err?.error?.message ?? 'Error creating profile';
        this.isSubmitting = false;
      }
    });
  }
}