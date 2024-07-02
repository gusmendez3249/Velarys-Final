import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nivel3',
  templateUrl: './nivel3.component.html',
  styleUrls: ['./nivel3.component.css']
})
export class Nivel3Component {

  constructor(private router: Router) {}

  volver(): void {
    this.router.navigate(['/curso']);
  }

  cerrarSesion(): void {
    // Implementar la lógica de cierre de sesión aquí
    console.log('Cerrar sesión');
  }
  
}

