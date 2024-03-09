import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ProductItemComponent } from '../product-item/product-item.component';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItemComponent],
  providers: [ProductService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  products: Array<Product> = [];

  productService = inject(ProductService);
  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .subscribe((products) => (this.products = products));
  }
}
