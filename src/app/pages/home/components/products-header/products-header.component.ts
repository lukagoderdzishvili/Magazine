import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html'
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange: EventEmitter<number> = new EventEmitter<number>();
  public sort: string = 'desc';
  public itmesShowCount: number = 12;

  public onSortUpdated(newSort: string): void{
    this.sort = newSort;
  }

  public onItemsUpdated(count: number): void{
    this.itmesShowCount = count;
  }

  public onColumnsUpdated(colsNum: number): void{
    this.columnsCountChange.emit(colsNum);
  }
}
