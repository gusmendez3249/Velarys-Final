import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nivel2',
  templateUrl: './nivel2.component.html',
  styleUrls: ['./nivel2.component.css']
})
export class Nivel2Component {

  constructor(private router: Router) {}

  volver(): void {
    this.router.navigate(['/curso']);
  }

  cerrarSesion(): void {
    // Implementar la lógica de cierre de sesión aquí
    console.log('Cerrar sesión');
  }
  
}


