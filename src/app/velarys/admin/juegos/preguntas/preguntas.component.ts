import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasAdmin implements OnInit {
  cursoId: string | null = null;
  nivelId: string | null = null;
  leccionId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.cursoId = params.get('cursoId');
      this.nivelId = params.get('nivelId');
      this.leccionId = params.get('leccionId');
      // Inicializa el cuestionario con los parámetros recibidos
    });
  }
}
