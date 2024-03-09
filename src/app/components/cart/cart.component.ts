import { Component, inject } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { PaymentInfo } from '../../models/payment';
import { ProductCart } from '../../models/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  formGroup = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    creditCardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]),
  });

  shoppingCartService = inject(ShoppingCartService);
  paymentService = inject(PaymentService);
  router = inject(Router);

  placeOrder(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAsDirty();
      this.formGroup.markAllAsTouched();
      this.formGroup.updateValueAndValidity();
      return;
    }
    const payment = {
      ...this.formGroup.value,
      total: this.shoppingCartService.getShoppingCart().totalCost,
    } as PaymentInfo;
    this.shoppingCartService.removeAll();
    this.paymentService.updatePaymentInfo(payment);
    this.router.navigateByUrl('/confirmation');
  }

  removeItem(id: number): void {
    this.shoppingCartService.removeProduct(id);
    alert('Deleted item');
  }
  onQuantityChange(product: ProductCart): void {
    if (product.quantity > 0) {
      this.shoppingCartService.updateQuantity(product);
    }
  }
  onQuantityBlur(product: ProductCart): void {
    if (product.quantity < 1) {
      alert('Quantity must be greater than 0');
      product.quantity = 1;
      this.shoppingCartService.updateQuantity(product);
    }
  }
}
