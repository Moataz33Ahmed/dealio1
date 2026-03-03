import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, UserRegisterModel } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class RegisterComponent {
  user: UserRegisterModel = {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };
  isLoading = false;
  errorMsg = '';
  successMsg = '';
  showPopup = false;

  constructor(private authService: AuthService) {}

  onRegister(form: NgForm) {
    this.errorMsg = '';
    this.successMsg = '';
    if (form.invalid || this.user.password !== this.user.confirmPassword) {
      this.errorMsg = "Please fill all fields correctly.";
      return;
    }
    this.isLoading = true;
    this.authService.register(this.user).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMsg = `We've sent an email to your inbox to verify your email address and activate your account. The link in the email will expire in 24 hours.`;
        this.showPopup = true;
        form.resetForm();
        setTimeout(() => {
          this.showPopup = false;
        }, 6000); // Hide after 6 seconds
      },
      error: (err: any) => {
        this.isLoading = false;
        if (err.error && typeof err.error === 'string') {
          this.errorMsg = err.error;
        } else if (err.error && err.error.errors) {
          this.errorMsg = Object.values(err.error.errors).flat().join('\n');
        } else {
          this.errorMsg = 'Registration failed. Please try again.';
        }
      }
    });
  }
}