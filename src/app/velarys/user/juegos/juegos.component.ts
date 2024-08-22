import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-juegos-usuario',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {
  cursoId: number | null = null;
  nivelId: number | null = null;
  leccionId: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const cursoIdParam = params.get('cursoId');
      const nivelIdParam = params.get('nivelId');
      const leccionIdParam = params.get('leccionId');

      this.cursoId = cursoIdParam ? +cursoIdParam : null;
      this.nivelId = nivelIdParam ? +nivelIdParam : null;
      this.leccionId = leccionIdParam ? +leccionIdParam : null;
    });
  }

  seleccionarJuego(tipo: string): void {
    if (this.cursoId !== null && this.nivelId !== null && this.leccionId !== null) {
      if (tipo === 'preguntas') {
        this.router.navigate([`/preguntasuser/${this.cursoId}/${this.nivelId}/${this.leccionId}`]);
      }
    } else {
      console.error('Los parámetros de curso, nivel y lección no están disponibles.');
    }
  }

  volver(): void{
    window.history.back();
  }
}
