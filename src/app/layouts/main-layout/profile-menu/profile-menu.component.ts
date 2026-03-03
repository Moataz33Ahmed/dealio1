import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProfileMenuComponent {
  @Input() isOpen: boolean = false;
  @Input() user: { name: string; phone: string; status: string } = {
    name: 'tarek samy fathy',
    phone: '01288868504',
    status: 'Free'
  };

  @Output() logout = new EventEmitter<void>();
  @Output() closeMenu = new EventEmitter<void>();

  onListingsProduct() {
    this.closeMenu.emit();
  }

  onOrders() {
    this.closeMenu.emit();
  }

  onMyAccount() {
    this.closeMenu.emit();
  }

  onLogout() {
    this.logout.emit();
    this.closeMenu.emit();
  }

  onCloseMenu() {
    this.closeMenu.emit();
  }
}