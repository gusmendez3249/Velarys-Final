import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nivel1',
  templateUrl: './nivel1.component.html',
  styleUrls: ['./nivel1.component.css']
})
export class Nivel1Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Aquí puedes cargar datos específicos para el nivel 1 si es necesario
  }

  volver(): void {
    this.router.navigate(['/curso']);
  }
}

