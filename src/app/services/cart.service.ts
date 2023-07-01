import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.mode';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: BehaviorSubject<Cart> = new BehaviorSubject<Cart>({items: []});

  constructor(private _snackBar: MatSnackBar) { }


  public addToCart(item: CartItem): void{
    const items: CartItem[] = [...this.cart.value.items];
    const itemsInCart: CartItem | undefined = items.find((_item) => _item.id === item.id);
    if(itemsInCart){
      itemsInCart.quantity += 1;
    }else{
      items.push(item);
    }

    this.cart.next({items});
    this._snackBar.open('1 item added to cart.', 'Ok', {duration: 3000});
  }

  public removeQuantity(item: CartItem): void{
    let itemForRemove: CartItem | undefined;
    let filteredItems: CartItem[] = this.cart.value.items.map((_item) => {
      if(_item.id === item.id){
        _item.quantity--;

        if(_item.quantity === 0){
          itemForRemove = item;
        }
      }

      return _item;
    });

    if(itemForRemove){
      filteredItems = this.removeFromCart(itemForRemove, false);
    }

    this.cart.next({items: filteredItems});
    this._snackBar.open('1 item removed from cart.', 'Ok', {
      duration: 3000
    })
  }

  public getTotal(items: CartItem[]): number {
    return items
    .map(item => item.price * item.quantity)
    .reduce((prev, current) => prev + current, 0)
  }

  public clearCart(): void{
    this.cart.next({items: []});
    this._snackBar.open('Cart is cleared.', 'Ok', {duration: 3000});
  }

  public removeFromCart(item: CartItem, update: boolean = true): CartItem[]{
    const filteredItems: CartItem[] = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    this.cart.next({items: filteredItems});
    if(update){
      this._snackBar.open('1 item removed from cart.', 'Ok', {
        duration: 3000
      });
    }

    return filteredItems;
  }
}
