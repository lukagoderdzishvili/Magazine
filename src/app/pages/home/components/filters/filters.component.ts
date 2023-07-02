import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html'
})
export class FiltersComponent implements OnInit,  OnDestroy {
  @Output() showCategory: EventEmitter<string> = new EventEmitter<string>();
  public categories: string[] | undefined;
  public categoriesSubscription: Subscription | undefined;

  constructor(private storeService: StoreService){

  }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService.getAllCategories()
    .subscribe((response) => {
      this.categories = response;
    })
  }

  public onShowCategory(category: string): void{
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if(this.categoriesSubscription){
      this.categoriesSubscription.unsubscribe();
    }
  }

}
