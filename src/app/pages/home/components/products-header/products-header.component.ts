import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html'
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() itemsCountChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() sortChange: EventEmitter<string> = new EventEmitter<string>();
  
  public sort: string = 'desc';
  public itmesShowCount: number = 12;

  public onSortUpdated(newSort: string): void{
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  public onItemsUpdated(count: number): void{
    this.itmesShowCount = count;
    this.itemsCountChange.emit(count);
  }

  public onColumnsUpdated(colsNum: number): void{
    this.columnsCountChange.emit(colsNum);
  }
}
