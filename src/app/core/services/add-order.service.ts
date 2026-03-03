import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AddOrderService {
  private apiUrl = 'http://localhost:5064/api/Order/add';

  constructor(private http: HttpClient) {}

  addToCart(productId: number): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': '*/*'
    });

    const formData = new FormData();
    formData.append('productId', productId.toString());

    return this.http.post(this.apiUrl, formData, { headers });
  }
}