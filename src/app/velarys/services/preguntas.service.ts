import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private apiUrl = 'http://192.168.3.39:3000/api/preguntas'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {}

  // Obtener todas las preguntas
  getAllPreguntas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener preguntas por lección
  getPreguntasPorLeccion(leccionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/leccion/${leccionId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener una pregunta por su ID
  getPreguntaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Crear una nueva pregunta
  createPregunta(pregunta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pregunta).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar una pregunta existente
  updatePregunta(id: number, pregunta: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, pregunta).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar una pregunta
  deletePregunta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage); // Loguea el error para depuración
    return throwError(() => new Error(errorMessage));
  }
}
