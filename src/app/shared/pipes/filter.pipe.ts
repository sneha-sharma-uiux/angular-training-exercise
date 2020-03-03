import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], 
    genders: string[],species: string[],origins:string[]): any {
      if(items){
        if ( genders.length === 0  && species.length ===0 &&  origins.length ===0) {
          return items;
          }
          if(genders){
            items = items.filter(item => genders.indexOf(item['gender']) >-1);
          }
          if(species){
            items = items.filter(item => species.indexOf(item['species']) >-1);
          }
          if(origins){
            items = items.filter(item => origins.indexOf(item['origin']['name']) >-1);
          }
      }
      
        return items;
  }

}
