import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})


export class BienvenidaComponent {
  ipInfo:any;

  mostrarModal: boolean = false;
  mensajeModal: string = '';
  callbackConfirm: () => void = () => {};

  constructor(private router: Router) {}

  irACursos(): void {
    this.router.navigate(['/cursoadmin']);
  }

  cerrarSesion(): void {
    this.mostrarConfirmacion('¿Estás seguro de que deseas cerrar sesión?', () => {
      this.router.navigate(['/']);
    });
  }

  mostrarConfirmacion(mensaje: string, callback: () => void): void {
    this.mensajeModal = mensaje;
    this.callbackConfirm = callback;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  confirmarAccion(): void {
    if (this.callbackConfirm) {
      this.callbackConfirm();
    }
    this.cerrarModal();
  }
}
