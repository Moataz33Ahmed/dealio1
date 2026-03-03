import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserProfileCreate {
  firstName: string;
  lastName: string;
  image?: File | null;
  phone: string;
  city: string;
  region: string;
  street: string;
}

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private apiUrl = 'http://localhost:5064/api/UserProfile/create';

  constructor(private http: HttpClient) {}

  createUserProfile(profile: UserProfileCreate): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': '*/*'
      // لا تضع Content-Type هنا مع FormData
    });

    const formData = new FormData();
    formData.append('FirstName', profile.firstName);
    formData.append('LastName', profile.lastName);
    formData.append('Phone', profile.phone);
    formData.append('City', profile.city);
    formData.append('Region', profile.region);
    formData.append('Street', profile.street);
    if (profile.image) formData.append('Image', profile.image);

    return this.http.post(this.apiUrl, formData, { headers });
  }
}