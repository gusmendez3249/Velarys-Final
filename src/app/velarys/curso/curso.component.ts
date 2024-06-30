// src/app/curso/curso.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NivelesService } from '../niveles/niveles.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  niveles: any[] = [];

  constructor(private nivelesService: NivelesService, private router: Router) {}

  ngOnInit(): void {
    this.niveles = this.nivelesService.getNiveles();
  }

  accederNivel(nivelId: number): void {
    this.router.navigate([`/nivel/${nivelId}`]);  // Redirige al nivel seleccionado
  }

  irAPago(nivelId: number): void {
    this.router.navigate([`/pago/${nivelId}`]);  // Redirige a la página de pago del nivel seleccionado
  }

  volver(): void {
    this.router.navigate(['/']);  // Redirige a la página de inicio
  }

  cerrarSesion(): void {
    // Implementar la lógica de cierre de sesión aquí
    console.log('Cerrar sesión');
  }
}
