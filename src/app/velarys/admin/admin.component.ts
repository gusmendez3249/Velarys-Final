import { Component, OnInit } from '@angular/core';
import { NivelesService } from '../niveles/niveles.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  niveles: any[] = [];

  constructor(private nivelesService: NivelesService) {}

  ngOnInit(): void {
    this.niveles = this.nivelesService.getNiveles();
  }

  guardarCambios(nivel: any): void {
    this.nivelesService.actualizarNivel(nivel);
  }

  eliminarNivel(id: number): void {
    this.nivelesService.eliminarNivel(id);
  }

  agregarNivel(): void {
    const nuevoNivel = {
      id: this.niveles.length + 1,
      nombre: 'Nuevo Nivel',
      descripcion: '',
      esDePaga: false,
      acceso: true,
      precio: 0
    };
    this.nivelesService.agregarNivel(nuevoNivel);
    this.niveles.push(nuevoNivel);
  }

  cerrarSesion(): void {
    // Lógica para cerrar sesión
  }
}
