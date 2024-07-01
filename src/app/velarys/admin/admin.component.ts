import { Component, OnInit } from '@angular/core';
import { NivelesService } from '../niveles/niveles.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  niveles: any[] = [];
  nuevoNivel: any = {
    id: 0,
    nombre: '',
    descripcion: '',
    esDePaga: false,
    acceso: false,
    precio: 0
  };

  constructor(private nivelesService: NivelesService) {}

  ngOnInit(): void {
    this.niveles = this.nivelesService.getNiveles();
  }

  guardarCambios(nivel: any): void {
    this.nivelesService.actualizarNivel(nivel);
  }

  eliminarNivel(id: number): void {
    this.nivelesService.eliminarNivel(id);
    this.niveles = this.nivelesService.getNiveles();
  }

  agregarNivel(): void {
    if (this.nuevoNivel.nombre && this.nuevoNivel.descripcion) {
      // Incrementar ID
      this.nuevoNivel.id = this.niveles.length + 1;
      this.nivelesService.agregarNivel(this.nuevoNivel);
      this.niveles = this.nivelesService.getNiveles();
      // Resetear nuevoNivel
      this.nuevoNivel = { id: 0, nombre: '', descripcion: '', esDePaga: false, acceso: false, precio: 0 };
    }
  }

  cerrarSesion(): void {
    // Lógica para cerrar sesión
  }
}
