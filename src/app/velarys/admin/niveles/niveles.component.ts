import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Nivel {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  esDePaga: boolean;
  acceso: boolean;
}

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.css']
})
export class NivelesAdmin implements OnInit {
  niveles: Nivel[] = [];
  cursoSeleccionado: number = 0; // Valor inicial
  nuevoNivel: Nivel = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    esDePaga: false,
    acceso: false
  };

  nivelesPorCurso: { [cursoId: number]: Nivel[] } = {
    1: [
      { id: 1, nombre: 'Nivel 1', descripcion: 'Descripción del Nivel 1', precio: 10, esDePaga: false, acceso: true },
      { id: 2, nombre: 'Nivel 2', descripcion: 'Descripción del Nivel 2', precio: 20, esDePaga: true, acceso: false }
    ],
    2: [
      { id: 3, nombre: 'Nivel 3', descripcion: 'Descripción del Nivel 3', precio: 30, esDePaga: false, acceso: true }
    ]
  };

  private nivelIdCounter: number = 4;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cursoSeleccionado = +params.get('cursoId')!;
      this.cargarNiveles();
    });
  }

  cargarNiveles(): void {
    this.niveles = this.nivelesPorCurso[this.cursoSeleccionado] || [];
  }

  agregarNivel(): void {
    if (this.nuevoNivel.nombre && this.nuevoNivel.descripcion) {
      this.nuevoNivel.id = this.nivelIdCounter++;
      this.niveles.push({ ...this.nuevoNivel });
      this.nuevoNivel = { id: 0, nombre: '', descripcion: '', precio: 0, esDePaga: false, acceso: false };
    }
  }

  eliminarNivel(id: number): void {
    this.niveles = this.niveles.filter(nivel => nivel.id !== id);
  }

  guardarCambios(nivel: Nivel): void {
    console.log('Nivel guardado:', nivel);
  }

  volver(): void {
    this.router.navigate(['/cursoadmin']);
  }

  verLecciones(nivelId: number): void {
    this.router.navigate([`lecciones/${this.cursoSeleccionado}/${nivelId}`]);
  }
}
