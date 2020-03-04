import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {
    genderItems: any[];
    speciesItems: any[];
    originItems: any[];
  
    transform(
      items: any[],
      genders: string[], species: string[], origins: string[]): any {
  
      if (!(genders && species && origins)) {
        return items;
      }
  
  
      if (genders) {
        this.genderItems = items.filter(item => genders.indexOf(item['gender']) > -1);
      }
      if (species) {
        this.speciesItems = items.filter(item => species.indexOf(item['species']) > -1);
      }
      if (origins) {
        this.originItems = items.filter(item => origins.indexOf(item['origin']['name']) > -1);
      }
  
      let updatedItems1 = [], updatedItems2 = [], finalUpdatedItems = [];
      for (let prop in this.genderItems) {
        updatedItems1.push(this.genderItems[prop]);
      }
  
      for (let prop in this.speciesItems) {
        for (let p in updatedItems1) {
          if (this.speciesItems[prop].id == updatedItems1[p].id)
            updatedItems2.push(this.speciesItems[prop]);
        }
      }
  
      for (let prop in this.originItems) {
        for (let p in updatedItems2) {
          if (this.originItems[prop].id == updatedItems2[p].id)
            finalUpdatedItems.push(this.originItems[prop]);
        }
      }
      items = finalUpdatedItems;
      return items
    }
  
  } 
