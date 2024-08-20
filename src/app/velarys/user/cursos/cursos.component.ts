import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
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
    // Implementar lógica para el pago del curso
    this.router.navigate(['/pago']);
    // Redirigir a la página de pago o realizar el pago aquí
  }

  cerrarSesion(): void {
    this.mostrarConfirmacion('¿Estás seguro de que deseas cerrar sesión?', () => {
      // Redirigir al usuario a la página de cierre de sesión después de la confirmación
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
