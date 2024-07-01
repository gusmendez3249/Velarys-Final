import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NivelesService } from '../niveles/niveles.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  niveles = this.nivelesService.getNiveles();
  isAdmin = true; // Cambia esto a false en una aplicación real basada en el estado del usuario

  constructor(private nivelesService: NivelesService, private router: Router) {}

  ngOnInit(): void {}

  accederNivel(id: number): void {
    if (this.nivelesService.verificarAcceso(id)) {
      this.router.navigate(['/nivel', id]);
    } else {
      this.router.navigate(['/pago', id]);
    }
  }

  realizarPago(id: number): void {
    this.router.navigate(['/pago', id]);
  }

  volver(): void {
    this.router.navigate(['/']);
  }

  cerrarSesion(): void {
    // Lógica para cerrar sesión
  }

  irAdmin(): void {
    this.router.navigate(['/admin']);
  }

  irAlNivel(id: number): void {
    if (this.nivelesService.verificarAcceso(id)) {
      this.router.navigate(['/nivel', id]);
    } else {
      alert('No tienes acceso a este nivel.');
    }
  }
}
