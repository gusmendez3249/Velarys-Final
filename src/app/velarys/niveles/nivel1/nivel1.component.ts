import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nivel1',
  templateUrl: './nivel1.component.html',
  styleUrls: ['./nivel1.component.css']
})
export class Nivel1Component {

  constructor(private router: Router) {}

  volver(): void {
    this.router.navigate(['/curso']);
  }

  cerrarSesion(): void {
    // Implementar la lógica de cierre de sesión aquí
    console.log('Cerrar sesión');
  }

  irAPreguntas(): void {
    this.router.navigate(['/preguntas']);
  }
}


