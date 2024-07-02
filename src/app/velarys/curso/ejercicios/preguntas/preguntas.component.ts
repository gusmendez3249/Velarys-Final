import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pregunta } from './pregunta.model';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  preguntasForm: FormGroup;
  preguntas: Pregunta[] = [
    {
      texto: 'What color is the hat?',
      imagen: 'assets/Luigi.jpg',
      opciones: ['White', 'Green', 'Gray', 'Black']
    },
    {
      texto: 'What color is your jacket?',
      imagen: 'assets/Zapa.jpg',
      opciones: ['Red', 'Blue', 'Yellow', 'Purple']
    },
    {
      texto: '¿He is a kid?',
      imagen: 'assets/niño.jpg',
      opciones: ['Yes', 'No']
    },
    {
      texto: 'What can be seen in the image?',
      imagen: 'assets/Pelota.jpg',
      opciones: ['ball', 'soccer ball', 'Basketball', 'Stone']
    },
    {
      texto: 'What is this?',
      imagen: 'assets/sol.jpg',
      opciones: ['Sun', 'Moon', 'Mars', 'Andromeda']
    }
  ];

  currentIndex = 0;
  shuffledQuestions: Pregunta[] = [];
  imagenFinal = 'assets/COngrats.jpg';
  isFinished = false;

  constructor(private fb: FormBuilder) {
    this.preguntasForm = this.fb.group({
      respuesta: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.shuffledQuestions = this.shuffleArray(this.preguntas);
    this.showQuestion(this.currentIndex);
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
      this.preguntasForm.reset({ respuesta: '' });
      this.currentIndex = index;
    } else {
      this.isFinished = true;
    }
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
