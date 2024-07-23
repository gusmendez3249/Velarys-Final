import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Juego {
  id: number;
  tipo: string; // 'preguntas' o 'memoramas'
  contenido: any; // Puede ser un array de preguntas o detalles del memorama
}

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosAdmin implements OnInit {
  juegos: Juego[] = [];
  nuevoJuego: Juego = { id: 0, tipo: '', contenido: '' };
  leccionId: number | null = null;

  juegosPorLeccion: { [leccionId: number]: Juego[] } = {
    1: [
      { id: 1, tipo: 'preguntas', contenido: [{ pregunta: '¿Qué es Angular?', respuesta: 'Un framework de JavaScript' }] },
      { id: 2, tipo: 'memoramas', contenido: [{ pareja: 'palabra1', pareja1: 'palabra2' }] }
    ],
    2: [
      { id: 3, tipo: 'preguntas', contenido: [{ pregunta: '¿Qué es TypeScript?', respuesta: 'Un superset de JavaScript' }] }
    ]
  };

  private juegoIdCounter: number = 4;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.leccionId = +this.route.snapshot.paramMap.get('leccionId')!;
    this.cargarJuegos();
  }

  cargarJuegos(): void {
    if (this.leccionId) {
      this.juegos = this.juegosPorLeccion[this.leccionId] || [];
    }
  }

  agregarJuego(): void {
    if (this.nuevoJuego.tipo && this.nuevoJuego.contenido) {
      this.nuevoJuego.id = this.juegoIdCounter++;
      if (this.leccionId) {
        if (!this.juegosPorLeccion[this.leccionId]) {
          this.juegosPorLeccion[this.leccionId] = [];
        }
        this.juegosPorLeccion[this.leccionId].push({ ...this.nuevoJuego });
        this.cargarJuegos();
      }
      this.nuevoJuego = { id: 0, tipo: '', contenido: '' };
    }
  }

  guardarCambios(juego: Juego): void {
    console.log('Juego guardado:', juego);
  }

  eliminarJuego(id: number): void {
    if (this.leccionId) {
      this.juegos = this.juegos.filter(juego => juego.id !== id);
      this.juegosPorLeccion[this.leccionId] = this.juegos;
    }
    console.log('Juego eliminado con ID:', id);
  }

  volver(): void {
    window.history.back();
  }
}
