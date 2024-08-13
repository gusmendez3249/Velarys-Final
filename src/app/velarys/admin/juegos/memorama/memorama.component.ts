import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-memorama',
  templateUrl: './memorama.component.html',
  styleUrls: ['./memorama.component.css']
})
export class MemoramaAdmin implements OnInit {
  cursoId: string | null = null;
  nivelId: string | null = null;
  leccionId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.cursoId = params.get('cursoId');
      this.nivelId = params.get('nivelId');
      this.leccionId = params.get('leccionId');
      // Inicializa el memorama con los parámetros recibidos
    });
  }
}
