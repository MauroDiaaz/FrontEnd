import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap((response: any) => {
          if (response.success) {
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            localStorage.setItem('authToken', response.token);
          }
        })
      );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; // Devuelve true si hay un token
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/registro`, { username, email, password });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logout`).pipe(
      tap(() => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
      })
    );
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user && user.role === 'admin';
  }
}
