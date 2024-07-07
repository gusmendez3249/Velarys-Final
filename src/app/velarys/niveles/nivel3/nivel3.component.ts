import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nivel3',
  templateUrl: './nivel3.component.html',
  styleUrls: ['./nivel3.component.css']
})
export class Nivel3Component {

  constructor(private router: Router) {}

  volver() {
    // Volver a la página anterior usando la History API
    window.history.back(); // Regresa a la página anterior
  }




}

