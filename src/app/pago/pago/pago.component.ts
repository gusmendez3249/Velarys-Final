import { Component, AfterViewInit, Renderer2, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

declare var paypal: any; // Declarar PayPal como una variable global

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements AfterViewInit {
  cursoId: string = '';
  cursoPrecio: number = 0; // Precio inicial

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inyección del ID de la plataforma
  ) {
    // Verificar si estamos en el navegador antes de acceder a localStorage
    if (isPlatformBrowser(this.platformId)) {
      this.cursoId = localStorage.getItem('cursoId') || '';
      this.cursoPrecio = parseFloat(localStorage.getItem('cursoPrecio') || '0');
    }
  }

  ngAfterViewInit(): void {
    this.loadPayPalScript();
  }

  loadPayPalScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=Ae_nT_6X9qsYJKiZdHHKqvfE3dv-fwyMGZXZWEdGrdYP8JWGBIVrhdaSSxLBxiDwwJuw0mfNTcMLGt3w&components=buttons';
    script.onload = () => {
      this.setupPayPalButton();
    };
    script.onerror = (error: Event | string) => {
      console.error('Error loading PayPal SDK:', error);
    };
    this.renderer.appendChild(this.elementRef.nativeElement, script);
  }

  setupPayPalButton(): void {
    if (typeof paypal !== 'undefined') {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: 'USD',
                value: this.cursoPrecio.toFixed(2) // Usa el precio definido en la variable
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            this.showSuccessAlert(`Gracias por tu compra, ${details.payer.name.given_name}. Tu pedido ha sido procesado.`);
            this.activarCurso(this.cursoId); // Activa el curso después de la compra
          });
        },
        onError: (error: any) => {
          console.error('An error occurred during the transaction:', error);
        }
      }).render('#paypal-button-container'); // Asegúrate de que el contenedor exista
    } else {
      console.error('PayPal SDK is not loaded.');
    }
  }

  showSuccessAlert(message: string): void {
    const alertContainer = this.elementRef.nativeElement.querySelector('#success-alert');
    const alertMessage = this.elementRef.nativeElement.querySelector('#alert-message');

    alertMessage.textContent = message; // Configura el mensaje
    alertContainer.style.display = 'block'; // Muestra la alerta
  }

  cerrarAlerta(): void {
    const alertContainer = this.elementRef.nativeElement.querySelector('#success-alert');
    alertContainer.style.display = 'none'; // Oculta la alerta
  }

  volver(): void {
    window.history.back();
  }

  activarCurso(id: string): void {
    this.http.post(`http://localhost:3000/api/cursos/activar/${id}`, {}).subscribe(
      (response) => {
        console.log('Curso activado:', response);
        this.router.navigate(['/cursos']);
        this.limpiarLocalStorage();
      },
      (error) => {
        console.error('Error al activar el curso:', error);
      }
    );    
  }

  limpiarLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) { // Verificar si estamos en el navegador
      localStorage.removeItem('cursoId'); // Limpiar el localStorage
      localStorage.removeItem('cursoPrecio');
    }
  }
}