import { Component, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.mode';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private _cart: Cart = { items: []};
  public itemsQuantity: number = 0;

  @Input()

  get cart(): Cart{
    return this._cart;
  }
 
  set cart(cart: Cart){
    this._cart = cart;
    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  constructor(private cartService: CartService){

  }

  public getTotal(items: CartItem[]): number{
    return this.cartService.getTotal(items);
  }

  public onClearCart(): void{
    this.cartService.clearCart();
  }
}
