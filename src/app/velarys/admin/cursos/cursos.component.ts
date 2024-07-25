import { CursoService } from './../../services/curso.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosAdmin implements OnInit {
  cursos: any[] = [];
  nuevoCurso = { nombre: '', descripcion: '', precio: 0, esDePaga: false, acceso: false };
  cursoEditado: any = null;

  constructor(private cursoService: CursoService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerCursos();
  }

  obtenerCursos(): void {
    this.cursoService.getCursos().subscribe(
      (response) => {
        this.cursos = response;
      },
      (error) => {
        console.error('Error al obtener los cursos:', error);
      }
    );
  }

  crearCurso(): void {
    this.cursoService.createCurso(this.nuevoCurso).subscribe(
      (response) => {
        alert('Curso creado exitosamente');
        this.obtenerCursos();
        this.nuevoCurso = { nombre: '', descripcion: '', precio: 0, esDePaga: false, acceso: false };
      },
      (error) => {
        console.error('Error al crear el curso:', error);
      }
    );
  }

  editarCurso(curso: any): void {
    this.cursoEditado = { ...curso };
  }

  actualizarCurso(): void {
    if (this.cursoEditado) {
      this.cursoService.updateCurso(this.cursoEditado.id, this.cursoEditado).subscribe(
        (response) => {
          alert('Curso actualizado exitosamente');
          this.obtenerCursos();
          this.cursoEditado = null;
        },
        (error) => {
          console.error('Error al actualizar el curso:', error);
        }
      );
    }
  }

  cancelarEdicion(): void {
    this.cursoEditado = null;
  }

  eliminarCurso(id: number): void {
    this.cursoService.deleteCurso(id).subscribe(
      () => {
        alert('Curso eliminado exitosamente');
        this.obtenerCursos();
      },
      (error) => {
        console.error('Error al eliminar el curso:', error);
      }
    );
  }

  verNiveles(curso: any): void {
    this.router.navigate([`niveladmin/${curso.id}`]);
  }

  volver(): void {
    window.history.back();
  }
}
