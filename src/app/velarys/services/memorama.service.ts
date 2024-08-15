import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Memorama, Carta } from '../models/juego.model'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class MemoramaService {
  private apiUrl = 'http://localhost:3000/api/memoramas'; // Ajusta según tu configuración

  constructor(private http: HttpClient) {}

  obtenerMemoramasPorLeccion(leccionId: number): Observable<Memorama[]> {
    return this.http.get<Memorama[]>(`${this.apiUrl}/leccion/${leccionId}`);
  }

  obtenerMemoramaPorId(id: number): Observable<Memorama> {
    return this.http.get<Memorama>(`${this.apiUrl}/${id}`);
  }

  crearMemorama(memorama: Memorama): Observable<Memorama> {
    return this.http.post<Memorama>(this.apiUrl, memorama);
  }

  actualizarMemorama(id: number, memorama: Memorama): Observable<Memorama> {
    return this.http.put<Memorama>(`${this.apiUrl}/${id}`, memorama);
  }

  eliminarMemorama(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obtenerCartasPorMemoramaId(memoramaId: number): Observable<Carta[]> {
    return this.http.get<Carta[]>(`${this.apiUrl}/${memoramaId}/cartas`);
  }

  crearCarta(memoramaId: number, carta: Carta): Observable<Carta> {
    return this.http.post<Carta>(`${this.apiUrl}/${memoramaId}/cartas`, carta);
  }

  actualizarCarta(memoramaId: number, cartaId: number, carta: Carta): Observable<Carta> {
    return this.http.put<Carta>(`${this.apiUrl}/${memoramaId}/cartas/${cartaId}`, carta);
  }

  eliminarCarta(memoramaId: number, cartaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${memoramaId}/cartas/${cartaId}`);
  }
}
