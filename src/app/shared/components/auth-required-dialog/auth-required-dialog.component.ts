import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-required-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-required-dialog.component.html',
  styleUrls: ['./auth-required-dialog.component.scss']
})
export class AuthRequiredDialogComponent {
  @Output() close = new EventEmitter<'login' | 'signup' | 'cancel'>();

  onLogin() { this.close.emit('login'); }
  onSignup() { this.close.emit('signup'); }
  onCancel() { this.close.emit('cancel'); }
}