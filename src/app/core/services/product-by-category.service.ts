import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductByCategoryService {
  private baseUrl = 'http://localhost:5064/api/Product/products-by-category';

  constructor(private http: HttpClient) {}

  getProductsByCategory(categoryId?: number): Observable<any> {
    let params = new HttpParams();
    if (categoryId !== undefined) {
      params = params.set('CategoryId', categoryId);
    }
    return this.http.get<any>(this.baseUrl, { params });
  }
}