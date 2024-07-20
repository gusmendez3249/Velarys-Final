// src/app/admin/cursos/cursos.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosAdmin implements OnInit {
  cursos: any[] = [
    { id: 1, nombre: 'Curso 1', descripcion: 'Descripción del Curso 1' },
    { id: 2, nombre: 'Curso 2', descripcion: 'Descripción del Curso 2' }
  ];

  nuevoCurso: any = {
    id: 0,
    nombre: '',
    descripcion: ''
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Inicialización si es necesario
  }

  agregarCurso(): void {
    if (this.nuevoCurso.nombre && this.nuevoCurso.descripcion) {
      this.nuevoCurso.id = this.cursos.length + 1;
      this.cursos.push(this.nuevoCurso);
      this.nuevoCurso = { id: 0, nombre: '', descripcion: '' };
    }
  }

  guardarCambios(curso: any): void {
    const index = this.cursos.findIndex(c => c.id === curso.id);
    if (index !== -1) {
      this.cursos[index] = curso;
    }
  }

  eliminarCurso(id: number): void {
    this.cursos = this.cursos.filter(c => c.id !== id);
  }

  verNiveles(cursoId: number): void {
    this.router.navigate([`niveladmin/${cursoId}`]);
  }



  cerrarSesion(): void {
    this.router.navigate(['/cerrar']);
  }
}

