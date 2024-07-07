import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NivelesService } from '../niveles/niveles.service';
import { CursosService } from './cursos.service';
@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  niveles = this.nivelesService.getNiveles();
  isAdmin = true; // Cambia esto a false en una aplicación real basada en el estado del usuario
  idiomaId: number = 0;

  constructor(
    private nivelesService: NivelesService,
    private router: Router,
    private route: ActivatedRoute,
    private cursosService: CursosService // Inyectar CursosService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idiomaId');
    if (id) {
      this.idiomaId = +id;
      if (!this.cursosService.esCursoDisponible(this.idiomaId)) {
        alert('El curso no está disponible.');
        this.router.navigate(['/idiomas']); // Redirige al inicio si el curso no está disponible
      }
    } else {
      alert('No se ha seleccionado ningún curso.');
      this.router.navigate(['/']);
    }
  }

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

  cerrarSesion(): void {
    this.router.navigate(['/cerrar']);
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
  irAIdiomas(): void {
    this.router.navigate(['/idiomas']); // Asegúrate de que la ruta /idiomas esté configurada en tu archivo de enrutamiento
  }
}
