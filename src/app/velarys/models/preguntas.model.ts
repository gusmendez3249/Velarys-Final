// src/app/models/preguntas.model.ts
export interface Opcion {
  texto: string;
  esCorrecta: boolean;
}

export interface Pregunta {
  id?: number;
  texto: string;
  opciones: Opcion[];
  respuesta_correcta: string;
  leccionId?: number;
}
