import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

const ROWS_HEIGHT: { [id: number]: number} = {
  1: 400,
  3: 335,
  4: 350 
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public cols: number = 3;
  public rowHeight: number = ROWS_HEIGHT[this.cols];
  public category: string | undefined;

  constructor(private cartService: CartService){

  }

  public onColumnsCountChange(colsNum: number): void{
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
  
  public onShowCategory(newCategory: string): void{
    this.category = newCategory;
  }

  public onAddToCart(product: Product): void{
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
  }
}
