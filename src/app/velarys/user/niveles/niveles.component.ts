import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NivelService } from '../../services/nivel.service';
import { Nivel } from '../../models/nivel.model';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.css']
})
export class NivelesComponent implements OnInit {
  niveles: Nivel[] = [];
  cursoId: number = 0;
  errorMensaje: string = '';

  constructor(
    private nivelService: NivelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cursoId = +this.route.snapshot.paramMap.get('cursoId')!;
    this.obtenerNiveles();
  }

  obtenerNiveles(): void {
    this.nivelService.obtenerNivelesPorCurso(this.cursoId).subscribe(
      (response) => {
        this.niveles = response;
      },
      (error) => {
        console.error('Error al obtener los niveles:', error);
        this.errorMensaje = 'No se pudieron cargar los niveles. Inténtelo de nuevo más tarde.';
      }
    );
  }

  verLecciones(nivel: Nivel): void {
    if (nivel.acceso) {
      this.router.navigate([`lecciones/${this.cursoId}/${nivel.id}`]);
    } else {
      this.errorMensaje = 'No tienes acceso a las lecciones de este nivel.';
    }
  }

  volver(): void {
  window.history.back();
  }
  pagarNivel(nivel: any): void {
    
  }
}
