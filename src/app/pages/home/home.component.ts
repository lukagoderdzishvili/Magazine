import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: { [id: number]: number} = {
  1: 400,
  3: 335,
  4: 350 
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  public cols: number = 3;
  public rowHeight: number = ROWS_HEIGHT[this.cols];
  public category: string | undefined;
  public products: Product[] | undefined;
  public sort: string = 'desc';
  public count: string = '12';
  public productsSubcription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService){

  }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void{
    this.productsSubcription = this.storeService.getAllProducts(this.count, this.sort, this.category)
    .subscribe((_products) => {
      this.products = _products;
      console.log(this.products);
    });
  }

  public onColumnsCountChange(colsNum: number): void{
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
  
  public onShowCategory(newCategory: string): void{
    this.category = newCategory;
    this.getProducts();
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

  public onItemsCountChange(newCount: number): void{
    this.count = newCount.toString();
    this.getProducts();
  }

  public onSortChange(newSort: string): void{
    this.sort = newSort;
    this.getProducts();
  }

  ngOnDestroy(): void {
    if(this.productsSubcription){
      this.productsSubcription.unsubscribe();
    }
  }
}
