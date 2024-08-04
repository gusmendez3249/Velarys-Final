export interface Nivel {
  id?: number;
  nombre: string;
  descripcion: string;
  precio?: number; // Opcional
  esDePaga: boolean;
  acceso: boolean;
  cursoId: number;
}
