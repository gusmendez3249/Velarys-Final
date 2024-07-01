import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NivelesService } from '../niveles.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  pagoForm: FormGroup;
  nivelId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private nivelesService: NivelesService
  ) {
    this.pagoForm = this.fb.group({
      nombre: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      expiracion: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{2})$')]],
      correo: ['', [Validators.required, Validators.email]]
    });

    this.nivelId = this.route.snapshot.params['nivelId'];
  }

  ngOnInit(): void {
    // any additional initialization
  }

  onSubmit(): void {
    if (this.pagoForm.valid) {
      this.nivelesService.actualizarAcceso(this.nivelId);
      this.router.navigate(['/curso']);
    }
  }
  volver(): void {
    this.router.navigate(['/curso']);
  }

  cerrarSesion(): void {
    // Lógica para cerrar sesión
    this.router.navigate(['/login']);
  }
}
