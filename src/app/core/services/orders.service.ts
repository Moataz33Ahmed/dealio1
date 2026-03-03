import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BuyerOrder {
  id: number;
  orderDate: string;
  orderStatus: string;
  orderNumber: string;
  productId: number;
  buyerId: string;
  deliveryId: string;
}

export interface BuyerOrdersResponse {
  statusCode: number;
  message: string;
  data: BuyerOrder[];
}

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private apiUrl = 'http://localhost:5064/api/Order/buyer-orders';

  constructor(private http: HttpClient) {}

  getBuyerOrders(): Observable<BuyerOrdersResponse> {
    return this.http.get<BuyerOrdersResponse>(this.apiUrl);
  }
}