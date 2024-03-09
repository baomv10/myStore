import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  paymentService = inject(PaymentService);
  router = inject(Router);
  ngOnInit(): void {
    console.log(this.paymentService.getPaymentInfo());
    if (!this.paymentService.getPaymentInfo()) {
      this.router.navigateByUrl('/products');
    }
  }

  ngOnDestroy(): void {
    this.paymentService.updatePaymentInfo(null);
  }
}
