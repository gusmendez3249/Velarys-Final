// carta.model.ts
export interface Carta {
  id?: number;
  valor: string;
  estado: 'abierto' | 'cerrado';
  memoramaId: number;
}
