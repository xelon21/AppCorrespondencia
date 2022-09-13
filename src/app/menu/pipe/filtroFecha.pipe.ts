import { Pipe, PipeTransform } from '@angular/core';
import { Correspondencia, CorrespondenciaSqlServer } from '../interface/correspondencia.interface';


@Pipe({
    name: 'fechaFil'
})
export class FiltroFechaPipe implements PipeTransform {

    transform( lista: CorrespondenciaSqlServer[], page: number = 0): any[] {     
     
      return lista.slice( page, page + 8 );
     
    }
  
}
    


