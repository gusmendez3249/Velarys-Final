import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LeccionService } from './../../services/leccion.service';
import { Leccion } from './../../models/leccion.model';

@Component({
  selector: 'app-lecciones',
  templateUrl: './lecciones.component.html',
  styleUrls: ['./lecciones.component.css']
})
export class LeccionesComponent implements OnInit {
  lecciones: Leccion[] = [];
  nivelId: number = 0;
  cursoId: number | null = null;
  indiceActual: number = 0;

  constructor(
    private leccionService: LeccionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cursoId = +this.route.snapshot.paramMap.get('cursoId')!;
    this.nivelId = +this.route.snapshot.paramMap.get('nivelId')!;
    this.obtenerLecciones();
  }

  obtenerLecciones(): void {
    if (this.nivelId !== null) {
      this.leccionService.obtenerLeccionesPorNivelId(this.nivelId).subscribe(
        response => {
          this.lecciones = response;
          // Asegúrate de que hay lecciones disponibles
          if (this.lecciones.length === 0) {
            console.warn('No se encontraron lecciones para este nivel.');
          }
        },
        error => console.error('Error al obtener las lecciones.', error)
      );
    }
  }

  anteriorLeccion(): void {
    if (this.indiceActual > 0) {
      this.indiceActual--;
    }
  }

  siguienteLeccion(): void {
    if (this.indiceActual < this.lecciones.length - 1) {
      this.indiceActual++;
    }
  }

  verJuegos(leccionId: number | undefined): void {
    if (leccionId !== undefined && this.cursoId) {
      this.router.navigate([`/juegos/${this.cursoId}/${this.nivelId}/${leccionId}`]);
    } else {
      console.error('Curso o lección no identificado. No se puede navegar a los juegos.');
    }
  }

  volver(): void {
    window.history.back();
  }
}
