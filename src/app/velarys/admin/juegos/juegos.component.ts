import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosAdmin {
  cursoId: string = 'defaultCursoId'; // Cambia estos valores según sea necesario
  nivelId: string = 'defaultNivelId';
  leccionId: string = 'defaultLeccionId';

  constructor(private router: Router) {}

  seleccionarJuego(tipo: string) {
    // Redirige según el tipo de juego
    if (tipo === 'preguntas') {
      this.router.navigate([`/preguntas/${this.cursoId}/${this.nivelId}/${this.leccionId}`]);
    } else if (tipo === 'memorama') {
      this.router.navigate([`/memorama/${this.cursoId}/${this.nivelId}/${this.leccionId}`]);
    }
  }
}
