export interface ShoppingCart {
  items: Array<ProductCart>;
  totalCost: number;
}

export interface ProductCart {
  id: number;
  name: string;
  price: number;
  quantity: number;
  url: string;
  description: string;
}
