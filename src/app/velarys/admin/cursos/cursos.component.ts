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
    mostrarModal: boolean = false;
    mensajeModal: string = '';
    callbackConfirm: () => void = () => {};

    constructor(
      private cursoService: CursoService,
      private router: Router
    ) { }

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
      this.mostrarConfirmacion('¿Estás seguro de que deseas crear este curso?', () => {
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
      });
    }

    editarCurso(curso: any): void {
      this.cursoEditado = { ...curso };
    }

    actualizarCurso(): void {
      if (this.cursoEditado) {
        this.mostrarConfirmacion('¿Estás seguro de que deseas actualizar este curso?', () => {
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
        });
      }
    }

    cancelarEdicion(): void {
      this.cursoEditado = null;
    }

    eliminarCurso(id: number): void {
      this.mostrarConfirmacion('¿Estás seguro de que deseas eliminar este curso?', () => {
        this.cursoService.deleteCurso(id).subscribe(
          () => {
            alert('Curso eliminado exitosamente');
            this.obtenerCursos();
          },
          (error) => {
            console.error('Error al eliminar el curso:', error);

            if (error.status === 400 && error.error === 'No se puede eliminar el curso porque existen registros relacionados en otras tablas.') {
              alert('No se puede eliminar el curso porque existen registros relacionados en otras tablas.');
            } else {
              alert('No se pudo eliminar el curso. Elimine primero los niveles de este curso.');
            }
          }
        );
      });
    }


    verNiveles(curso: any): void {
      this.router.navigate([`niveladmin/${curso.id}`]);
    }

    cerrarSesion(): void {
      this.router.navigate(['/cerrar']);
    }

   mostrarConfirmacion(mensaje: string, callback: () => void): void {
  this.mensajeModal = mensaje;
  this.callbackConfirm = callback;
  this.mostrarModal = true;
}

    cerrarModal(): void {
      this.mostrarModal = false;
    }

    confirmarAccion(): void {
      if (this.callbackConfirm) {
        this.callbackConfirm();
      }
      this.cerrarModal();
    }

  }

