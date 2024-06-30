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
    this.cargarNiveles();
  }

  cargarNiveles(): void {
    this.niveles = this.nivelesService.getNiveles();
  }

  accederNivel(id: number): void {
    if (this.nivelesService.verificarAcceso(id)) {
      this.router.navigate([`/nivel/${id}`]);
    } else {
      alert('Este nivel es de paga. Realiza el pago para acceder.');
    }
  }

  realizarPago(id: number): void {
    if (confirm('¿Estás seguro de que deseas pagar para acceder a este nivel?')) {
      this.nivelesService.realizarPago(id).subscribe(exito => {
        if (exito) {
          this.nivelesService.actualizarAcceso(id);
          this.router.navigate([`/nivel/${id}`]);
        } else {
          alert('Hubo un error al realizar el pago. Por favor, intenta de nuevo.');
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['/']);
  }

  cerrarSesion(): void {
    // Implementar la lógica de cierre de sesión aquí
    console.log('Cerrar sesión');
  }
}
