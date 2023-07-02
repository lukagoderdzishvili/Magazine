import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: 'product-box.component.html'
})
export class ProductBoxComponent {
  @Input() fullWidthMode: boolean = false;
  @Input() product: Product | undefined;
  @Output() addToCart: EventEmitter<any> = new EventEmitter();

  public onAddToCart(): void{
    this.addToCart.emit(this.product);
  }
}
