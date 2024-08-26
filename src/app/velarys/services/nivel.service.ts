import { Nivel } from './../models/nivel.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NivelService {
  private apiUrl = 'http://localhost:8080/api/niveles';

  constructor(private http: HttpClient) { }

  // Adaptar la URL para que coincida con la nueva ruta del backend
  obtenerNivelesPorCurso(cursoId: number): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(`${this.apiUrl}/curso/${cursoId}`);
  }

  crearNivel(nivel: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, nivel);
  }

  editarNivel(id: number, nivel: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, nivel);
  }

  eliminarNivel(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

