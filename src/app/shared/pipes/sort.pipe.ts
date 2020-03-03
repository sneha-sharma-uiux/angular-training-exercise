import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'sort',
  pure:false
})
export class SortPipe implements PipeTransform {
  actualItems: any[];
  transform(items: any[], fieldName: string, order: string): any {
    if (!items || !fieldName) {
      return items;
    }
    if (items !== this.actualItems) {
      this.actualItems = items;
    }
    if (order === 'desc') {
      return items.sort((a, b) => (a.fieldName < b.fieldName) ? 1 : -1)
    }
    // asc
    return items.sort((a, b) => (a.fieldName > b.fieldName) ? -1 : 1)
  }
} 
