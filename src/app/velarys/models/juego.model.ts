export interface Juego {
  id?: number;
  leccionId: number;
  tipo: string;
  contenido: string;
}

export interface Memorama {
  id?: number;
  nombre: string;
  cartas: Carta[];
}

export interface Carta {
  id: number;
  valor: string;
  estado: 'cerrado' | 'abierto' | 'completado';
  colorClass: string;
}
