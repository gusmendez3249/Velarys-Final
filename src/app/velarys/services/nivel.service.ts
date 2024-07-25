import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NivelService {
  private apiUrl = `http://localhost:3000/api/niveles`;

  constructor(private http: HttpClient) { }

  obtenerNivelesPorCurso(cursoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?cursoId=${cursoId}`);
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
