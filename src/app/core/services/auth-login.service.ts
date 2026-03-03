import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface LoginResponse {
  statusCode: number;
  message: string;
  data: {
    userId: string;
    userName: string;
    email: string;
    role: string;
    isConfirmed: boolean;
    accessToken: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthLoginService {
  private apiUrl = 'http://localhost:5064/api/Authentication/login';
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const formData = new FormData();
    formData.append('Email', email);
    formData.append('Password', password);

    return this.http.post<LoginResponse>(this.apiUrl, formData)
      .pipe(
        tap(response => {
          if (response && response.data && response.data.accessToken) {
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('userName', response.data.userName);
            localStorage.setItem('userId', response.data.userId);
            this.loggedInSubject.next(true);
          }
        })
      );
  }

  setLoggedIn(val: boolean) {
    this.loggedInSubject.next(val);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    this.loggedInSubject.next(false);
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // أضف هذا الـ Getter ليستعمله AuthGuard
  get isLoggedInValue(): boolean {
    return this.loggedInSubject.value;
  }
}