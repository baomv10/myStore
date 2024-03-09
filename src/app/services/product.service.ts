import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';

@Injectable()
export class ProductService {
  http = inject(HttpClient);
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/assets/data.json');
  }

  getProductById(id: number): Observable<Product> {
    return this.getAllProducts().pipe(
      map((products) => products.filter((product) => product.id === id)[0]),
    );
  }
}
