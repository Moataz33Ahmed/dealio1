import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';
import { AuthLoginService } from '../../../core/services/auth-login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, RouterModule, ProfileMenuComponent]
})
export class HeaderComponent {
  isLoggedIn = false;
  showAlert = false;
  profileMenuOpen = false;

  user = {
    name: 'tarek samy fathy',
    phone: '01288868504',
    status: 'Free'
  };

  constructor(
    public auth: AuthLoginService,
    private router: Router
  ) {
    this.auth.isLoggedIn$.subscribe(val => this.isLoggedIn = val);
  }

  onLogin() { this.router.navigate(['/sign-in']); }
  onSignUp() { this.router.navigate(['/register']); }
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/']);
    this.profileMenuOpen = false;
  }

  onBecomeSellerClick() {
    if (!this.isLoggedIn) {
      this.showAlert = true;
      setTimeout(() => { this.showAlert = false; }, 2000);
      return;
    }
    this.router.navigate(['/sell']);
  }

  onOrdersClick() {
    if (!this.isLoggedIn) {
      this.showAlert = true;
      setTimeout(() => { this.showAlert = false; }, 2000);
      return;
    }
    this.router.navigate(['/orders']);
  }

  toggleProfileMenu() { this.profileMenuOpen = !this.profileMenuOpen; }
  closeProfileMenu() { this.profileMenuOpen = false; }

  // Close profile menu when clicking anywhere in the document outside the menu
  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    if (this.profileMenuOpen) {
      const menu = document.querySelector('.profile-menu-container');
      const button = document.querySelector('.action-btn[title="Profile Menu"]');
      // If click is outside menu and button, close menu
      if (
        menu && !menu.contains(event.target as Node) &&
        button && !button.contains(event.target as Node)
      ) {
        this.profileMenuOpen = false;
      }
    }
  }
}