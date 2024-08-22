export interface Carta {
  valores: string[];  // Asegúrate de que sea un array si estás usando un array de valores
  estado: string;
  memoramaId: number;  // Asegúrate de incluir este campo
  id?: number;  // Opcional, si puede tener un ID
}
