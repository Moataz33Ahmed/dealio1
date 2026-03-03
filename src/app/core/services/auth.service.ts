import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserRegisterModel {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5064/api/ApplicationUser/register';

  constructor(private http: HttpClient) {}

  register(user: UserRegisterModel): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}