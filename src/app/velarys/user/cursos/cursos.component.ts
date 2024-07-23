import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    // Aquí puedes cargar los cursos desde una API o servicio.
    // Este es un ejemplo de datos estáticos:
    this.cursos = [
      { id: 1, nombre: 'Curso 1', descripcion: 'Descripción del Curso 1' },
      { id: 2, nombre: 'Curso 2', descripcion: 'Descripción del Curso 2' }
    ];
  }

  verNiveles(cursoId: number): void {
    this.router.navigate([`/user/niveles/${cursoId}`]);
  }
}
