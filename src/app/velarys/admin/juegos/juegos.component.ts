import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosAdmin implements OnInit {
  cursoId: string | null = null; // Usa null para valores que pueden no estar definidos
  nivelId: string | null = null;
  leccionId: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtén los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.cursoId = params.get('cursoId');
      this.nivelId = params.get('nivelId');
      this.leccionId = params.get('leccionId');
    });
  }

  seleccionarJuego(tipo: string): void {
    if (this.cursoId && this.nivelId && this.leccionId) {
      if (tipo === 'preguntas') {
        this.router.navigate([`/preguntas/${this.cursoId}/${this.nivelId}/${this.leccionId}`]);
      }
    } else {
      console.error('Faltan parámetros de curso, nivel o lección.');
    }
  }

  volver(): void {
    window.history.back();
  }
}
