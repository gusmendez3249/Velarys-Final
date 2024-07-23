import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Leccion {
  id: number;
  nombre: string;
  contenido: string;
}

@Component({
  selector: 'app-lecciones',
  templateUrl: './lecciones.component.html',
  styleUrls: ['./lecciones.component.css']
})
export class LeccionesAdmin implements OnInit {
  lecciones: Leccion[] = [];
  nuevoLeccion: Leccion = { id: 0, nombre: '', contenido: '' };
  cursoId: number | null = null;
  nivelId: number | null = null;

  leccionesPorNivel: { [nivelId: number]: Leccion[] } = {
    1: [
      { id: 1, nombre: 'Lección 1', contenido: 'Contenido de la Lección 1' },
      { id: 2, nombre: 'Lección 2', contenido: 'Contenido de la Lección 2' }
    ],
    2: [
      { id: 3, nombre: 'Lección 3', contenido: 'Contenido de la Lección 3' },
      { id: 4, nombre: 'Lección 4', contenido: 'Contenido de la Lección 4' }
    ]
  };

  private leccionIdCounter: number = 5;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.cursoId = +this.route.snapshot.paramMap.get('cursoId')!;
    this.nivelId = +this.route.snapshot.paramMap.get('nivelId')!;
    this.cargarLecciones();
  }

  cargarLecciones(): void {
    this.lecciones = this.leccionesPorNivel[this.nivelId!] || [];
  }

  guardarCambios(leccion: Leccion): void {
    console.log('Cambios guardados para la lección:', leccion);
  }

  eliminarLeccion(id: number): void {
    this.lecciones = this.lecciones.filter(leccion => leccion.id !== id);
    console.log('Lección eliminada con ID:', id);
  }

  agregarLeccion(): void {
    if (this.nuevoLeccion.nombre && this.nuevoLeccion.contenido) {
      this.nuevoLeccion.id = this.leccionIdCounter++;
      this.lecciones.push({ ...this.nuevoLeccion });
      this.nuevoLeccion = { id: 0, nombre: '', contenido: '' };
    }
  }

  verJuegos(leccionId: number): void {
    this.router.navigate([`juegos/${this.cursoId}/${this.nivelId}/${leccionId}`]);
  }

  volver(): void {
    window.history.back();
  }
}
