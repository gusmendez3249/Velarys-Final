import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerrar-secion',
  templateUrl: './cerrar-secion.component.html',
  styleUrl: './cerrar-secion.component.css'
})
export class CerrarSecionComponent {

  constructor() {}

  cerrarSesion() {

    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = '/bienvenida';
  }

  cancelar() {
    // Volver a la página anterior usando la History API
    window.history.back(); // Regresa a la página anterior
  }
}
