import { Pipe, PipeTransform } from '@angular/core';
import { Correspondencia } from '../interface/correspondencia.interface';


@Pipe({
    name: 'fechaFil'
})
export class FiltroFechaPipe implements PipeTransform {

    transform( lista: Correspondencia[], page: number = 0): any[] {     
     
      return lista.slice( page, page + 8 );
     
    }
  
}
    


