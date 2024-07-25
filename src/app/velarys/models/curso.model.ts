// curso.model.ts
export interface Curso {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  esDePaga: boolean;
  acceso: boolean;
}
