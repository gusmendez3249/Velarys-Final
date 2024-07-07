import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private cursos = [
    { id: 1, nombre: 'Inglés', disponible: true },
    { id: 2, nombre: 'Mandarin', disponible: false },
    { id: 3, nombre: 'Francés', disponible:false},
    { id: 4, nombre: 'Aleman', disponible:false},
    { id: 5, nombre: 'Portugues', disponible:false}
    // Puedes agregar más cursos aquí
  ];

  // Método para obtener un curso por su ID
  getCursoById(id: number) {
    return this.cursos.find(curso => curso.id === id);
  }

  // Método para verificar si un curso está disponible
  esCursoDisponible(id: number): boolean {
    const curso = this.getCursoById(id);
    return curso ? curso.disponible : false;
  }
}
