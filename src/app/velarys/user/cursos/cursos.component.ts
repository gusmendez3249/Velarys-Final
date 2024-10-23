import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {
  cursos: any[] = [];
  mostrarModal: boolean = false;
  mensajeModal: string = '';
  callbackConfirm: () => void = () => {};

  constructor(private cursoService: CursoService, private router: Router) {}

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

  verNiveles(curso: any): void {
    if (curso.acceso) {
      this.router.navigate([`niveles/${curso.id}`]);
    }
  }

  pagarCurso(curso: any): void {
    // Almacena el ID y precio del curso en el localStorage
    localStorage.setItem('cursoId', curso.id);
    localStorage.setItem('cursoPrecio', curso.precio); // Asigna el precio
    this.router.navigate(['/pago']);
  }

  cerrarSesion(): void {
    this.mostrarConfirmacion('¿Estás seguro de que deseas cerrar sesión?', () => {
      this.router.navigate(['/']);
    });
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
