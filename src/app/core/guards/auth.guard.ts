import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthLoginService } from '../services/auth-login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthLoginService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isLoggedInValue) {
      this.router.navigate(['/sign-in']);
      return false;
    }
    return true;
  }
}