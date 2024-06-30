import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nivel2',
  templateUrl: './nivel2.component.html',
  styleUrls: ['./nivel2.component.css']
})
export class Nivel2Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Aquí puedes cargar datos específicos para el nivel 2 si es necesario
  }

  volver(): void {
    this.router.navigate(['/curso']);
  }
}
