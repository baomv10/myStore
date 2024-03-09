import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-item-detail',
  standalone: true,
  imports: [RouterModule, FormsModule],
  providers: [ProductService],
  templateUrl: './product-item-detail.component.html',
  styleUrl: './product-item-detail.component.scss',
})
export class ProductItemDetailComponent {
  product!: Product;
  quantity = 1;
  lstQuantity = Array.from({ length: 10 }, (_, i) => i + 1);

  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  shoppingCartService = inject(ShoppingCartService);

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.productService
      .getProductById(+id)
      .subscribe((product) => (this.product = product));
  }
  addToCart(product: Product): void {
    this.shoppingCartService.addToCart({ ...product, quantity: this.quantity });
    alert('Added to cart');
  }
}
