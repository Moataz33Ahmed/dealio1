import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root'
})
export class SellerProductService {
  private apiUrl = 'http://localhost:5064/api/Product/products-by-user';

  constructor(private http: HttpClient) {}

  getProductsByUser(): Observable<{ statusCode: number, message: string, data: Product[] }> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'accept': '*/*'
    });
    return this.http.get<{ statusCode: number, message: string, data: Product[] }>(this.apiUrl, { headers });
  }
}