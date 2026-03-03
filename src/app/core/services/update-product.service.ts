import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// هذا الـ interface يمثل الـ payload المطلوب للـ API
export interface UpdateProductPayload {
  ProductId: number;
  Name: string;
  Description: string;
  Price: number;
  CategoryId: number;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateProductService {
  private apiUrl = 'http://localhost:5064/api/Product/update';

  constructor(private http: HttpClient) {}

  updateProduct(payload: UpdateProductPayload): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Accept': '*/*'
      // لا تضع Content-Type هنا!
    });

    // جهز البيانات في FormData حسب توقعات الـ API
    const formData = new FormData();
    formData.append('ProductId', payload.ProductId.toString());
    formData.append('Name', payload.Name);
    formData.append('Description', payload.Description);
    formData.append('Price', payload.Price.toString());
    formData.append('CategoryId', payload.CategoryId.toString());

    return this.http.put(this.apiUrl, formData, { headers });
  }
}