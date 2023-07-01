import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.mode';
import { CartService } from 'src/app/services/cart.service';

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

  constructor(private cartSetvice: CartService){

  }

  ngOnInit(): void {
    this.cartSetvice.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  public getTotal(items: CartItem[]): number {
    return this.cartSetvice.getTotal(items);
  }

  public onClearCart(): void{
    this.cartSetvice.clearCart();
  }

  public onRemoveFromCart(item: CartItem): void{
    this.cartSetvice.removeFromCart(item);
  }

  public onAddQuantity(item: CartItem): void{
    this.cartSetvice.addToCart(item);
  }

  public onRemoveQuantity(item: CartItem): void{
    this.cartSetvice.removeQuantity(item);
  }
}
