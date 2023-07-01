import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html'
})
export class FiltersComponent {
  @Output() showCategory: EventEmitter<string> = new EventEmitter<string>();
  public categories: string[] = ['shoes', 'sports'];

  public onShowCategory(category: string): void{
    this.showCategory.emit(category);
  }

}
