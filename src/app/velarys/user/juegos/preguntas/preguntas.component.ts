import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Pregunta } from '../../../models/preguntas.model';  // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-preguntas-usuario',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  preguntasForm: FormGroup;
  preguntas: Pregunta[] = []; // Este array será llenado con las preguntas administradas
  currentIndex = 0;
  shuffledQuestions: Pregunta[] = [];
  isFinished = false;

  constructor(private fb: FormBuilder) {
    this.preguntasForm = this.fb.group({
      respuesta: ['', Validators.required],
      opciones: this.fb.array([]) // Inicializa el FormArray vacío
    });
  }

  ngOnInit(): void {
    this.shuffledQuestions = this.shuffleArray(this.preguntas);
    this.showQuestion(this.currentIndex);
  }

  get opciones(): FormArray {
    return this.preguntasForm.get('opciones') as FormArray;
  }

  shuffleArray(array: Pregunta[]): Pregunta[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  showQuestion(index: number): void {
    if (index < this.shuffledQuestions.length) {
      const opciones = this.shuffledQuestions[index]?.opciones || [];
      this.preguntasForm.reset({ respuesta: '' });
      this.setOpciones(opciones);
      this.currentIndex = index;
    } else {
      this.isFinished = true;
    }
  }

  setOpciones(opciones: string[]): void {
    const opcionesFormArray = this.opciones;
    opcionesFormArray.clear();
    opciones.forEach(opcion => opcionesFormArray.push(this.fb.control(opcion, Validators.required)));
  }

  nextQuestion(): void {
    this.currentIndex++;
    this.showQuestion(this.currentIndex);
  }

  guardarRespuesta(): void {
    if (this.preguntasForm.valid) {
      console.log('Respuesta guardada:', this.preguntasForm.value.respuesta);
      this.nextQuestion();
    } else {
      console.error('Formulario no es válido');
    }
  }
}


