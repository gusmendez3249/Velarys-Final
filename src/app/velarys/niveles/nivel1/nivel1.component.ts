import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nivel1',
  templateUrl: './nivel1.component.html',
  styleUrls: ['./nivel1.component.css']
})
export class Nivel1Component {
  seccionActual: string = 'tema1'; // Por defecto, mostrar el primer tema

  constructor(private router: Router) {}

  volver() {
    // Volver a la página anterior usando la History API
    window.history.back(); // Regresa a la página anterior
  }

  irAPreguntas(): void {
    this.router.navigate(['/preguntas']);
  }

  mostrarSeccion(seccion: string): void {
    this.seccionActual = seccion;
  }
}
