import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RatingService {
  private apiUrl = 'http://localhost:5064/api/Rating/add';

  constructor(private http: HttpClient) {}

  sendRating(ratingValue: number, comment: string): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': '*/*'
      // Don't set Content-Type here with FormData!
    });

    const formData = new FormData();
    formData.append('Comment', comment);
    formData.append('RatingValue', ratingValue.toString());

    return this.http.post(this.apiUrl, formData, { headers });
  }
}