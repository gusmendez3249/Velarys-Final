export interface Pregunta {
    id?: number;              // ID opcional para la identificación única de la pregunta
    texto: string;            // El texto de la pregunta
    imagen?: string;          // La ruta de la imagen opcional asociada con la pregunta
    opciones: string[];       // Las opciones posibles para responder la pregunta
    respuestaCorrecta: string; // La respuesta correcta para la pregunta
    leccionId: number;        // El ID de la lección a la que pertenece la pregunta
  }
  