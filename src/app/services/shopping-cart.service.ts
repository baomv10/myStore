import { Injectable, signal } from '@angular/core';
import { ProductCart, ShoppingCart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private carts = signal<ShoppingCart>({
    items: [],
    totalCost: 0,
  });

  getShoppingCart(): ShoppingCart {
    return this.carts();
  }

  addToCart(newItem: ProductCart): void {
    const currentProducts = this.carts().items;
    const existedProduct = currentProducts.find((p) => p.id === newItem.id);

    if (existedProduct) {
      existedProduct.quantity = +existedProduct.quantity + +newItem.quantity;
    } else {
      currentProducts.push(newItem);
    }
    const total = currentProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );

    this.carts.set({
      items: currentProducts,
      totalCost: total,
    });
  }

  updateQuantity(newItem: ProductCart): void {
    const currentProducts = this.carts().items;
    const existedProduct = currentProducts.find((p) => p.id === newItem.id);

    if (existedProduct) {
      existedProduct.quantity = newItem.quantity;
    }
    const total = currentProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );

    this.carts.set({
      items: currentProducts,
      totalCost: total,
    });
  }

  removeProduct(id: number): void {
    const currentProducts = this.carts().items;
    const newProducts = currentProducts.filter((p) => p.id !== id);

    const total = newProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );

    this.carts.set({
      items: newProducts,
      totalCost: total,
    });
  }

  removeAll(): void {
    this.carts.set({
      items: [],
      totalCost: 0,
    });
  }
}
