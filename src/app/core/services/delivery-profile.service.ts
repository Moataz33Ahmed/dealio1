import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DeliveryProfileRequest {
  FirstName: string;
  LastName: string;
  NationalId: string;
  Image?: File | null; // خليها اختيارية
  Phone: string;
  City: string;
  Region: string;
  Street: string;
}

@Injectable({ providedIn: 'root' })
export class DeliveryProfileService {
  private apiUrl = 'http://localhost:5064/api/DeliveryProfile/create';

  constructor(private http: HttpClient) {}

  createDeliveryProfile(data: DeliveryProfileRequest): Observable<any> {
    const formData = new FormData();
    formData.append('FirstName', data.FirstName ?? '');
    formData.append('LastName', data.LastName ?? '');
    formData.append('NationalId', data.NationalId ?? '');
    formData.append('Phone', data.Phone ?? '');
    formData.append('City', data.City ?? '');
    formData.append('Region', data.Region ?? '');
    formData.append('Street', data.Street ?? '');
    if (data.Image) formData.append('Image', data.Image, data.Image.name);
    return this.http.post<any>(this.apiUrl, formData);
  }
}