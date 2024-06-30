import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nivel3',
  templateUrl: './nivel3.component.html',
  styleUrls: ['./nivel3.component.css']
})
export class Nivel3Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Aquí puedes cargar datos específicos para el nivel 3 si es necesario
  }

  volver(): void {
    this.router.navigate(['/curso']);
  }
}
