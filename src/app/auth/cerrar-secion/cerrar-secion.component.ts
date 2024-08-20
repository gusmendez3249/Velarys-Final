import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cerrar-secion',
  templateUrl: './cerrar-secion.component.html',
  styleUrls: ['./cerrar-secion.component.css']
})
export class CerrarSecionComponent {
  isVisible = false;

  @Output() onConfirm = new EventEmitter<void>();

  openModal(): void {
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }

  confirm(): void {
    this.onConfirm.emit();
    this.closeModal();
  }
}
