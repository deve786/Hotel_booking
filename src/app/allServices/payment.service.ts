import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor() {}

  loadPayPalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=your-client-id&currency=USD';
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }

  renderPayPalButton(totalCost: number, onSuccess: (details: any) => void) {
    (window as any).paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: totalCost.toFixed(2)
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then(onSuccess);
      }
    }).render('#paypal-button-container');
  }
}
