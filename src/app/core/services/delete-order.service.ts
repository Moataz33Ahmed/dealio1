import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeleteOrderService {
  private apiUrl = 'http://localhost:5064/api/Order/delete';

  constructor(private http: HttpClient) {}

  deleteOrder(orderId: number): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': '*/*'
    });

    return this.http.delete<any>(`${this.apiUrl}?orderId=${orderId}`, { headers });
  }
}