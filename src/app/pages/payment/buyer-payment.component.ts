import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BuyerPaymentService } from '../../core/services/buyer-payment.service';
import { ActivatedRoute, Router } from '@angular/router'; // ← استيراد Router

@Component({
  selector: 'app-buyer-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './buyer-payment.component.html',
  styleUrls: ['./buyer-payment.component.scss']
})
export class BuyerPaymentComponent {
  paymentForm: FormGroup;
  buyerId: string = '';
  orderId: string = '';
  isLoading: boolean = false;
  successMsg: string = '';
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private paymentService: BuyerPaymentService,
    private route: ActivatedRoute,
    private router: Router // ← إضافة هنا
  ) {
    this.paymentForm = this.fb.group({
      paymentMethod: ['', [Validators.required]],
      cardInfo: ['', [Validators.required, Validators.minLength(13)]]
    });

    this.buyerId = localStorage.getItem('userId') || '';
    console.log('BuyerId from localStorage:', this.buyerId);

    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'] || '';
      console.log('OrderId from queryParams:', this.orderId);
    });
  }

  get f() { return this.paymentForm.controls; }

  submitPayment() {
    this.successMsg = '';
    this.errorMsg = '';

    console.log('BuyerId (before submit):', this.buyerId);
    console.log('OrderId (before submit):', this.orderId);

    if (this.paymentForm.invalid || !this.buyerId || !this.orderId) {
      this.paymentForm.markAllAsTouched();
      this.errorMsg = 'Order data is incomplete!';
      return;
    }
    this.isLoading = true;
    this.paymentService.processFakePayment({
      buyerId: this.buyerId,
      orderId: +this.orderId,
      paymentMethod: this.paymentForm.value.paymentMethod,
      cardInfo: this.paymentForm.value.cardInfo
    }).subscribe({
      next: (res) => {
        this.successMsg = res.message || 'Payment processed successfully!';
        this.isLoading = false;
        this.paymentForm.reset();

        // ← التنقل لصفحة التقييم بعد النجاح
        this.router.navigate(['/rating']);
      },
      error: (err) => {
        this.errorMsg = err?.error?.message ?? 'Payment failed!';
        this.isLoading = false;
      }
    });
  }
}