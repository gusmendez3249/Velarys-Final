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
  this.router.navigate(['/pago'])
    // Redirigir a la página de pago o realizar el pago aquí
  }

  cerrarSesion(): void {
    this.router.navigate(['/cerrar']);
  }
}
