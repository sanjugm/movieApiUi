import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public BASE_URL: string = "http://localhost:8080";
  private loggedIn = signal<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) { }

  register(registerRequest: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/api/v1/auth/register`, registerRequest);
  }

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.BASE_URL}/api/v1/auth/login`, loginRequest)
    .pipe(tap(response => {
      if (response && response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('name', response.name);
        localStorage.setItem('username', response.username);
        localStorage.setItem('email', response.email);

        const decodedToken: any = jwtDecode(response.accessToken);
        console.log('Decoded Token:', decodedToken);
        localStorage.setItem('role', decodedToken.role[0].authority);
      }
    }));
}
  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return token!= null && !this.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken'); 
    localStorage.removeItem('name');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.set(value);
  }

  getLoggedIn(): WritableSignal<boolean> {
    return this.loggedIn;
  }

  isTokenExpired(token: string): boolean {
    const decodedToken: any = jwtDecode(token);
    return (decodedToken.exp * 1000) < Date.now();
  }

  refreshToken(): Observable<any> {
      const refToken = localStorage.getItem('refreshToken'); // fixed
  
      return this.http.post(`${this.BASE_URL}/api/v1/auth/refresh`, refToken) // pass the token directly
        .pipe(
          tap((res: any) => localStorage.setItem('accessToken', res.accessToken)),
          catchError(err => {
            this.logout();
            return throwError(() => err);
          })
        );
    }

  hasRole(role: string): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken?.role?.some((r: any) => r.authority === role);
      return Array.isArray(decodedToken?.role) && decodedToken.role.some((r: any) => r.authority === role);
    }
    return false;
  }
}

export type RegisterRequest = {
  name: string,
  email: string,
  username: string,
  password: string,
}

export type AuthResponse = {
  accessToken: string,
  refreshToken: string,
  name: string,
  email: string,
  username: string,
}

export type LoginRequest = {
  email: string,
  password: string,
}

export type RefreshTokenRequest = {
  refreshToken: string | null;
}
