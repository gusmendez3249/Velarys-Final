import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NivelesService } from '../niveles/niveles.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  niveles: any[] = [];  // Inicialización de niveles como un array vacío

  constructor(private nivelesService: NivelesService, private router: Router) {}

  ngOnInit(): void {
    this.niveles = this.nivelesService.getNiveles();
  }

  volver(): void {
    this.router.navigate(['/']); // Ruta de volver
  }

  cerrarSesion(): void {
    // Lógica para cerrar sesión
  }

  accederNivel(id: number): void {
    if (this.nivelesService.verificarAcceso(id)) {
      this.router.navigate([`/contenido/${id}`]); // Redirige al contenido del nivel
    } else {
      // Mostrar mensaje de pago requerido
    }
  }

  realizarPago(id: number): void {
    // Lógica de pago
    this.nivelesService.actualizarAcceso(id);
  }
}

