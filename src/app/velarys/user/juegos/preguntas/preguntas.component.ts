import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PreguntaService } from '../../../services/preguntas.service';
import { Pregunta } from '../../../models/preguntas.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-preguntas-usuario',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  preguntasForm: FormGroup;
  shuffledQuestions: Pregunta[] = [];
  currentIndex: number = 0;
  isFinished: boolean = false;
  leccionId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private preguntaService: PreguntaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.preguntasForm = this.fb.group({
      opciones: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const newLeccionId = +params.get('leccionId')!;
      if (newLeccionId !== this.leccionId) {
        this.leccionId = newLeccionId;
        this.loadQuestions();
      }
    });
  }

  loadQuestions(): void {
    if (this.leccionId !== null) {
      this.preguntaService.getPreguntasPorLeccion(this.leccionId).subscribe(
        (preguntas: Pregunta[]) => {
          this.shuffledQuestions = preguntas;
          this.currentIndex = 0; // Reiniciar el índice al cargar nuevas preguntas
          this.isFinished = false; // Asegúrate de que el estado de finalización esté actualizado
          this.updateForm();
        },
        error => console.error('Error al cargar preguntas', error)
      );
    } else {
      console.error('ID de lección no disponible.');
    }
  }

  updateForm(): void {
    if (this.shuffledQuestions.length > 0) {
      this.setFormOptions(this.shuffledQuestions[this.currentIndex].opciones);
    }
  }

  setFormOptions(opciones: { texto: string, esCorrecta: boolean }[]): void {
    const formArray = this.fb.array(
      opciones.map(opcion => this.fb.control(opcion.texto, Validators.required))
    );
    this.preguntasForm.setControl('opciones', formArray);
  }

  get opciones(): FormArray {
    return this.preguntasForm.get('opciones') as FormArray;
  }

  guardarRespuesta(): void {
    if (this.currentIndex < this.shuffledQuestions.length - 1) {
      this.currentIndex++;
      this.updateForm();
    } else {
      this.isFinished = true;
    }
  }
}
