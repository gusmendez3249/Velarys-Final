import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
    private route: ActivatedRoute,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.cursoId = +this.route.snapshot.paramMap.get('cursoId')!;
    this.nivelId = +this.route.snapshot.paramMap.get('nivelId')!;
    this.obtenerLecciones();

    // Solo ejecuta el script si estamos en un entorno de navegador
    if (isPlatformBrowser(this.platformId)) {
      const script = this.renderer.createElement('script');
      script.src = 'https://cse.google.com/cse.js?cx=208825525e2834300';
      script.async = true;
      this.renderer.appendChild(document.body, script);
    }
  }

  obtenerLecciones(): void {
    if (this.nivelId !== null) {
      this.leccionService.obtenerLeccionesPorNivelId(this.nivelId).subscribe(
        response => {
          this.lecciones = response;
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
