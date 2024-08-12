import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // URL base del API
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  register(nombres: string, apellidos: string, email: string, edad: number, sexo: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      nombres,
      apellidos,
      email,
      edad,
      sexo,
      password
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          this.setToken(response.token); // Suponiendo que el token se recibe en la respuesta
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  logout(): void {
    this.removeToken();
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  private setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  private removeToken(): void {
    localStorage.removeItem('authToken');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
