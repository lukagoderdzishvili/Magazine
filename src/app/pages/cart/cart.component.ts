import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.mode';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  public cart: Cart = { items: [
    {
      product: 'https://via.placeholder.com/150',
      name: 'snickers',
      price: 150,
      quantity: 1,
      id: 1
    },
    {
      product: 'https://via.placeholder.com/150',
      name: 'snickers',
      price: 150,
      quantity: 3,
      id: 2
    }
  ]};
  public dataSource: CartItem[] = [];
  public displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];

  ngOnInit(): void {
    this.dataSource = this.cart.items;
  }

  public getTotal(items: CartItem[]): number {
    return items
    .map(item => item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0)
  }
}
