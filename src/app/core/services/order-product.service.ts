import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  status: string;
  sellerId: string;
  categoryId: number;
  images: string[];
}

export interface ProductResponse {
  statusCode: number;
  message: string;
  data: Product;
}

@Injectable({ providedIn: 'root' })
export class OrderProductService {
  private apiUrl = 'http://localhost:5064/api/Product/product-by-id';

  constructor(private http: HttpClient) {}

  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}?Id=${id}`);
  }
}