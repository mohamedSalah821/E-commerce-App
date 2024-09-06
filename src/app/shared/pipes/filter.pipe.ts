import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interfaces/products';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(productList:Products[],searchTerm:string):Products[] {
    
    return productList.filter((p)=>{
      return p.title.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }

}
