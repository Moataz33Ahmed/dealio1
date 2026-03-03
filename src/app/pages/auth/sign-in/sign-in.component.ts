import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthLoginService } from '../../../core/services/auth-login.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class SignInComponent {
  email = '';
  password = '';
  loading = false;
  apiError = '';

  constructor(
    private authLoginService: AuthLoginService,
    private router: Router
  ) {}

  onSubmit() {
    this.apiError = '';
    if (!this.email || !this.password) return;
    this.loading = true;

    this.authLoginService.login(this.email, this.password)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.data.accessToken);
          localStorage.setItem('userName', res.data.userName);
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('role', res.data.role); 
          this.authLoginService.setLoggedIn(true);

          this.loading = false;

          if (res.data.role === 'admin') {
            this.router.navigateByUrl('/admin');
          } else if (res.data.role === 'user') {
            this.router.navigateByUrl('/home');
          } else {
            this.router.navigateByUrl('/');
          }
        },
        error: (err) => {
          this.apiError = err?.error?.message || 'Login failed. Please try again.';
          this.loading = false;
        }
      });
  }
}