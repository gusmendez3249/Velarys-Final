import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leccion } from '../models/leccion.model';

@Injectable({
  providedIn: 'root'
})
export class LeccionService {
  private apiUrl = 'http://localhost:8080/api/lecciones'; // Ajusta según tu configuración

  constructor(private http: HttpClient) { }

  obtenerLeccionesPorNivelId(nivelId: number): Observable<Leccion[]> {
    return this.http.get<Leccion[]>(`${this.apiUrl}/nivel/${nivelId}`);
  }

  crearLeccion(leccion: Leccion): Observable<Leccion> {
    return this.http.post<Leccion>(this.apiUrl, leccion);
  }

  actualizarLeccion(id: number, leccion: Leccion): Observable<Leccion> {
    return this.http.put<Leccion>(`${this.apiUrl}/${id}`, leccion);
  }

  eliminarLeccion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
