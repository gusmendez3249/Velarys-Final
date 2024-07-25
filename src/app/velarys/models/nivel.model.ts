export interface Nivel {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio?: number;
  esDePaga?: boolean;
  acceso?: boolean;
  cursoId?: number; // Marcar como opcional
}
