import { Injectable, signal } from '@angular/core';
import { PaymentInfo } from '../models/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private paymentInfo = signal<PaymentInfo | null>(null);

  getPaymentInfo(): PaymentInfo | null {
    return this.paymentInfo();
  }

  updatePaymentInfo(payment: PaymentInfo | null): void {
    this.paymentInfo.set(payment);
  }
}
