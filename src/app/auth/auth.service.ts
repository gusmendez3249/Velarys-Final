import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // URL base del API

  constructor(private http: HttpClient) {}

  register(nombres: string, apellidos: string, correo: string, edad: number, sexo: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      nombres,
      apellidos,
      correo,
      edad,
      sexo,
      contrasena
    });
  }

  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correo, contrasena });
  }
}
