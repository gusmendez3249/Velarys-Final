export interface Memorama {
  id?: number;
  nombre: string;
  leccionId?: number;
}

export interface Carta {
  id?: number;
  memoramaId: number;
  valor: string;
  estado: 'cerrado' | 'abierto' | 'completado';
  colorClass: string;
}
