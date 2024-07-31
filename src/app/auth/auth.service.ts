import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // URL base del API

  constructor(private http: HttpClient) {}

  register(nombres: string, apellidos: string, email: string, edad: number, sexo: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      nombres,
      apellidos,
      email, // Asegúrate de que este nombre coincida con el backend
      edad,
      sexo,
      password // Asegúrate de que este nombre coincida con el backend
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }
}
