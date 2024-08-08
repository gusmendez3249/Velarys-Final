// juego.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Juego, Memorama } from '../models/juego.model';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  private apiUrl = 'http://localhost:3000/api/juegos'; // Cambia esta URL según sea necesario

  constructor(private http: HttpClient) {}

  obtenerJuegosPorLeccionId(leccionId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(`${this.apiUrl}/leccion/${leccionId}`);
  }

  crearJuego(juego: Juego): Observable<any> {
    return this.http.post(this.apiUrl, juego);
  }

  actualizarJuego(id: number, juego: Juego): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, juego);
  }

  eliminarJuego(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  obtenerMemoramas(): Observable<Memorama[]> {
    return this.http.get<Memorama[]>(`${this.apiUrl}/memoramas`);
  }

  crearMemorama(memorama: Memorama): Observable<Memorama> {
    return this.http.post<Memorama>(`${this.apiUrl}/memoramas`, memorama);
  }

  actualizarMemorama(id: number, memorama: Memorama): Observable<Memorama> {
    return this.http.put<Memorama>(`${this.apiUrl}/memoramas/${id}`, memorama);
  }

  eliminarMemorama(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/memoramas/${id}`);
  }
}
