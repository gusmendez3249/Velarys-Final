import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio-secion',
  templateUrl: './inicio-secion.component.html',
  styleUrl: './inicio-secion.component.css'
})
export class InicioSecionComponent {
  constructor(private router: Router) { }
  ingresar(): void {
    this.router.navigate(['/idiomas']);
  }

  ingresaAdmin(): void {
    this.router.navigate(['/cursoadmin']);
  }
  volver():void {
    this.router.navigate(['/bienvenida']);
  }
}
