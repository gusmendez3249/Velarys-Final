import { Leccion } from './../../models/leccion.model';
import { LeccionService } from './../../services/leccion.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lecciones',
  templateUrl: './lecciones.component.html',
  styleUrls: ['./lecciones.component.css']
})
export class LeccionesAdmin implements OnInit {
  lecciones: Leccion[] = [];
  nuevaLeccion: Leccion = { nombre: '', contenido: '', nivelId: 0 }; // Valor inicial
  leccionEditada: Leccion | null = null;
  nivelId: number = 0;
  cursoId: number | null = null;

  constructor(
    private leccionService: LeccionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.nivelId = +this.route.snapshot.paramMap.get('nivelId')!;
    this.obtenerLecciones();
  }


  obtenerLecciones(): void {
    if (this.nivelId !== null) {
      this.leccionService.obtenerLeccionesPorNivelId(this.nivelId).subscribe(
        response => {
          this.lecciones = response;
        },
        error => {
          console.error('Error al obtener las lecciones:', error);
        }
      );
    }
  }

  crearLeccion(): void {
    if (this.nivelId !== null) {
      const leccionConNivelId: Leccion = { ...this.nuevaLeccion, nivelId: this.nivelId };
      this.leccionService.crearLeccion(leccionConNivelId).subscribe(
        response => {
          alert('Lección creada exitosamente');
          this.obtenerLecciones();
          this.nuevaLeccion = { nombre: '', contenido: '', nivelId: this.nivelId };
        },
        error => {
          console.error('Error al crear la lección:', error);
        }
      );
    } else {
      console.error('Nivel ID no disponible para crear la lección');
    }
  }



  seleccionarLeccion(leccion: Leccion): void {
    this.leccionEditada = { ...leccion };
  }

  editarLeccion(): void {
    if (this.leccionEditada && this.leccionEditada.id !== undefined) {
      this.leccionService.actualizarLeccion(this.leccionEditada.id, this.leccionEditada).subscribe(
        response => {
          alert('Lección editada exitosamente');
          this.obtenerLecciones();
          this.leccionEditada = null;
        },
        error => {
          console.error('Error al editar la lección:', error);
        }
      );
    } else {
      console.error('Lección no seleccionada o ID no disponible');
    }
  }

  eliminarLeccion(id: number): void {
    this.leccionService.eliminarLeccion(id).subscribe(
      () => {
        alert('Lección eliminada exitosamente');
        this.obtenerLecciones();
      },
      error => {
        console.error('Error al eliminar la lección:', error);
      }
    );
  }

  volver(): void {
    window.history.back();
  }

  verJuegos(leccion: any):void{
    this.router.navigate([`juegosadmin/${this.cursoId}/${this.nivelId}/${leccion.id}`]);
  }
}

