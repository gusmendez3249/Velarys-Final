import { Carta } from './../models/carta.model';
import { Memorama } from './../models/memorama.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemoramaService {
  private apiMemoramasUrl = 'http://localhost:3000/api/memoramas';
  private apiCartasUrl = 'http://localhost:3000/api/cartas';

  constructor(private http: HttpClient) { }

  obtenerMemoramasPorLeccionId(leccionId: number): Observable<Memorama[]> {
    return this.http.get<Memorama[]>(`${this.apiMemoramasUrl}/leccion/${leccionId}`);
  }

  crearMemorama(memorama: Memorama): Observable<Memorama> {
    return this.http.post<Memorama>(this.apiMemoramasUrl, memorama);
  }

  actualizarMemorama(id: number, memorama: Memorama): Observable<Memorama> {
    return this.http.put<Memorama>(`${this.apiMemoramasUrl}/${id}`, memorama);
  }

  eliminarMemorama(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiMemoramasUrl}/${id}`);
  }

  obtenerCartasPorMemoramaId(memoramaId: number): Observable<Carta[]> {
    return this.http.get<Carta[]>(`${this.apiCartasUrl}/${memoramaId}`);
  }

  crearCarta(carta: Carta): Observable<Carta> {
    return this.http.post<Carta>(this.apiCartasUrl, carta);
  }

  actualizarCarta(id: number, carta: Carta): Observable<Carta> {
    return this.http.put<Carta>(`${this.apiCartasUrl}/${id}`, carta);
  }

  eliminarCarta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiCartasUrl}/${id}`);
  }
}
