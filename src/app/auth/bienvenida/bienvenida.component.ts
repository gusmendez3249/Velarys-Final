import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {



  constructor(private router: Router) { }



  inicio() {
    // Lógica para comenzar el curso o redirigir a otra página
    this.router.navigate(['/inicio']);
  }
}
