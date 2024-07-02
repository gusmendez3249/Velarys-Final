import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerrar-secion',
  templateUrl: './cerrar-secion.component.html',
  styleUrl: './cerrar-secion.component.css'
})
export class CerrarSecionComponent {

  constructor(private router: Router) { }

  cerrarSesion() {
    // Lógica para comenzar el curso o redirigir a otra página
    this.router.navigate(['/bienvenida']);
  }

  cancelar() {
    // Lógica para comenzar el curso o redirigir a otra página
    this.router.navigate(['/curso']);
  }
}
