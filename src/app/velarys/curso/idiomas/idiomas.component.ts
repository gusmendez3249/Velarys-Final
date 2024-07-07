import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent {
  idiomas = [
    { id: 1, nombre: 'Inglés', descripcion: 'Mejora tu inglés con nuestros cursos interactivos.' },
    { id: 2, nombre: 'Mandarin', descripcion: 'Aprende mandarin de manera divertida y efectiva.' },
    { id: 3, nombre: 'Francés', descripcion: 'Domina el francés con nuestros recursos de aprendizaje.' },
    { id: 4, nombre: 'Aleman', descripcion: 'Domina el aleman con nuestros proximos cursos de aprendizaje.' },
    { id: 5, nombre: 'Portugues', descripcion: 'Aprende el portugues con nuestros recursos de aprendizaje.' }
  ];

  constructor(private router: Router) {}

  cerrarSesion(): void {
    this.router.navigate(['/cerrar']);
  }

  seleccionarIdioma(idiomaId: number) {
    // Navega a la ruta del curso correspondiente al idioma seleccionado
    this.router.navigate(['/curso', idiomaId]);
  }
}
