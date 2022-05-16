import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'filtroCorrelativo'
})
export class FiltroCorrelativoPipe implements PipeTransform {

    transform( lista: any[], texto: string ): any[] {       
        
      if(!texto) return lista;
      return lista.filter(user => user.correlativo.toUpperCase().includes(texto.toUpperCase())                     ///indexOf(texto) >- 1
      )
      
    }
  
}