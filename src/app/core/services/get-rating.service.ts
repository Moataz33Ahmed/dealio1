import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface RatingItem {
  id: number;
  comment: string;
  ratingValue: number;
  userName: string;
}

export interface GetRatingResponse {
  statusCode: number;
  message: string;
  data: RatingItem[];
}

@Injectable({ providedIn: 'root' })
export class GetRatingService {
  private apiUrl = 'http://localhost:5064/api/Rating/get-all';

  constructor(private http: HttpClient) {}

  getAllRatings(): Observable<RatingItem[]> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': '*/*'
    });

    return this.http.get<GetRatingResponse>(this.apiUrl, { headers }).pipe(
      map(response => response.data)
    );
  }
}