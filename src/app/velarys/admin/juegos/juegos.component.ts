import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JuegoService } from '../../services/juego.service';
import { Juego } from '../../models/juego.model';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosAdmin implements OnInit {
  juegos: Juego[] = [];
  nuevoJuego: Juego = {leccionId: 0, tipo: 'preguntas', contenido: ''};
  leccionId: number = 0;

  constructor(
    private juegoService: JuegoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.leccionId = +this.route.snapshot.paramMap.get('leccionId')!;
    this.obtenerJuegos();
  }

  obtenerJuegos(): void {
    if (this.leccionId !== null) {
      this.juegoService.obtenerJuegosPorLeccionId(this.leccionId).subscribe(
        response => {
          this.juegos = response;
        },
        error => {
          console.error('Error al obtener los juegos:', error);
        }
      );
    }
  }

  crearJuego(): void {
    if (this.leccionId !== null) {
      this.nuevoJuego.leccionId = this.leccionId;
      this.juegoService.crearJuego(this.nuevoJuego).subscribe(
        response => {
          alert('Juego creado exitosamente');
          this.obtenerJuegos();
          this.nuevoJuego = { tipo: 'preguntas', contenido: '', leccionId: this.leccionId };
        },
        error => {
          console.error('Error al crear el juego:', error);
        }
      );
    }
  }

  guardarCambios(juego: Juego): void {
    if (juego.id) {
      this.juegoService.actualizarJuego(juego.id, juego).subscribe(
        response => {
          alert('Juego actualizado exitosamente');
          this.obtenerJuegos();
        },
        error => {
          console.error('Error al actualizar el juego:', error);
        }
      );
    }
  }

  eliminarJuego(id: number): void {
    this.juegoService.eliminarJuego(id).subscribe(
      response => {
        alert('Juego eliminado exitosamente');
        this.obtenerJuegos();
      },
      error => {
        console.error('Error al eliminar el juego:', error);
      }
    );
  }

  volver(): void {
    window.history.back();
  }
}
