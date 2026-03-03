import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BuyerPaymentRequest {
  buyerId: string;
  orderId: number;
  paymentMethod: string;
  cardInfo: string;
}

export interface BuyerPaymentResponse {
  statusCode: number;
  message: string;
  data: any;
}

@Injectable({ providedIn: 'root' })
export class BuyerPaymentService {
  private apiUrl = 'http://localhost:5064/api/Payment/process-fake-payment';

  constructor(private http: HttpClient) {}

  processFakePayment(body: BuyerPaymentRequest): Observable<BuyerPaymentResponse> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'accept': '*/*'
    });

    return this.http.post<BuyerPaymentResponse>(
      this.apiUrl,
      '', // body فاضي
      {
        headers: headers,
        params: {
          buyerId: body.buyerId,
          orderId: body.orderId.toString(),
          paymentMethod: body.paymentMethod,
          cardInfo: body.cardInfo
        }
      }
    );
  }
}