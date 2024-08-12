import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Pregunta } from '../../../models/preguntas.model'; // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-preguntas-admin',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent {
  preguntasForm: FormGroup;
  preguntas: Pregunta[] = []; // Este array será manejado por el administrador
  editingIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.preguntasForm = this.fb.group({
      texto: ['', Validators.required],
      imagen: ['', Validators.required],
      opciones: this.fb.array(['', '', '', ''].map(opcion => this.fb.control(opcion, Validators.required)))
    });
  }

  get opciones(): FormArray {
    return this.preguntasForm.get('opciones') as FormArray;
  }

  agregarPregunta(): void {
    if (this.preguntasForm.valid) {
      const nuevaPregunta: Pregunta = {
        texto: this.preguntasForm.get('texto')?.value,
        imagen: this.preguntasForm.get('imagen')?.value,
        opciones: this.opciones.value,
        respuestaCorrecta: '',  // Este campo debe ajustarse según tu lógica
        leccionId: 0  // Este campo debe ajustarse según tu lógica
      };
      this.preguntas.push(nuevaPregunta);
      this.preguntasForm.reset();
      this.resetOpciones();
    }
  }

  editarPregunta(index: number): void {
    const pregunta = this.preguntas[index];
    this.preguntasForm.patchValue(pregunta);
    this.setOpciones(pregunta.opciones);
    this.editingIndex = index;
  }

  actualizarPregunta(): void {
    if (this.editingIndex !== null && this.preguntasForm.valid) {
      this.preguntas[this.editingIndex] = this.preguntasForm.value;
      this.editingIndex = null;
      this.preguntasForm.reset();
      this.resetOpciones();
    }
  }

  eliminarPregunta(index: number): void {
    this.preguntas.splice(index, 1);
  }

  private setOpciones(opciones: string[]): void {
    const formArray = this.opciones;
    formArray.clear();
    opciones.forEach(opcion => formArray.push(this.fb.control(opcion, Validators.required)));
  }

  private resetOpciones(): void {
    this.setOpciones(['', '', '', '']);
  }
}
