import { RouterModule } from '@angular/router';
import { Component, Input, inject } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input({ required: true }) product!: Product;

  quantity = 1;
  lstQuantity = Array.from({ length: 10 }, (_, i) => i + 1);

  shoppingCartService = inject(ShoppingCartService);
  addToCart(product: Product): void {
    this.shoppingCartService.addToCart({ ...product, quantity: this.quantity });
    alert('Added to cart');
  }
}
