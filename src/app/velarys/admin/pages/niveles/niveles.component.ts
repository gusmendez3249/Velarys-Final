import { Component, OnInit } from '@angular/core';

interface Nivel {
  nombre: string;
  descripcion: string;
  precio: number;
  esDePaga: boolean;
  acceso: boolean;
}

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrl: './niveles.component.css'
})

export class NivelesAdmin implements OnInit {
  niveles: Nivel[] = [
    { nombre: 'Nivel 1', descripcion: 'Descripción del Nivel 1', precio: 0, esDePaga: false, acceso: true },
    { nombre: 'Nivel 2', descripcion: 'Descripción del Nivel 2', precio: 100, esDePaga: true, acceso: false },
    { nombre: 'Nivel 3', descripcion: 'Descripción del Nivel 3', precio: 100, esDePaga: true, acceso: false }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  volver(): void {
    // Lógica para volver
  }

  cerrarSesion(): void {
    // Lógica para cerrar sesión
  }

  agregarNivel(): void {
    this.niveles.push({ nombre: '', descripcion: '', precio: 0, esDePaga: false, acceso: false });
  }

  eliminarNivel(index: number): void {
    this.niveles.splice(index, 1);
  }

  guardarCambios(): void {
    // Lógica para guardar los cambios (e.g., enviar los datos al backend)
    console.log('Niveles guardados:', this.niveles);
  }

}
