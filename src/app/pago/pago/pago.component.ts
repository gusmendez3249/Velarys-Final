import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
declare var paypal: any; // Declarar paypal como una variable global
@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.loadPayPalScript();
  }

  loadPayPalScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=ASgBRPsutwEpZ0HMvo39rnYBHvzR65HN1AEmFErJKWc1u0Rf679MShau5VTFBlQMRfUCTjAHTq9MSfqg&components=buttons';
    script.onload = () => {
      this.setupPayPalButton();
    };
    script.onerror = (error: Event | string) => {
      console.error('Error loading PayPal SDK:', error);
    };
    this.renderer.appendChild(this.elementRef.nativeElement, script);
  }

  setupPayPalButton(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => { // Aquí definimos el tipo para el parámetro data
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: '100.00'
            }
          }]
        });
      },
      onApprove: (data: any, actions:any) => {
        return actions.order.capture().then((details: any) => {
          alert('Transaction Successful');
          })
      },
      onError: (error: any) => {
        console.error('An error occurred during the transaction:', error);
      }
    }).render('#paypal-button-container');
  }
}
