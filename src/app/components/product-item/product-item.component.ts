import { RouterModule } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { ProductCart } from '../../models/cart';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input({ required: true }) product!: Product;
  @Output() addProductToCart = new EventEmitter<ProductCart>();

  quantity = 1;
  lstQuantity = Array.from({ length: 10 }, (_, i) => i + 1);

  addToCart(product: Product): void {
    const newProduct = { ...product, quantity: this.quantity };
    this.addProductToCart.emit(newProduct)
  }
}
