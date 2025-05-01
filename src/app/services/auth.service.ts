import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';

  isLoggedIn = signal(this.hasToken());
  role = signal<string | null>(this.getRoleFromToken());
  userName = signal<string | null>(this.getNameFromToken());

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedIn.set(true);
    this.role.set(this.getRoleFromToken());
    this.userName.set(this.getNameFromToken());
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.role.set(null);
    this.userName.set(null);
  }

  private getRoleFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch {
      return null;
    }
  }

  private getNameFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.name || `משתמש ${payload.userId}`;
    } catch {
      return null;
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
