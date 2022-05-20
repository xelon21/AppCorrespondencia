import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'searchNombre'
})
export class FiltroNombrePipe implements PipeTransform {

    transform( lista: any[], texto: string ): any[] {       
        
      if(!texto) return lista;
      return lista.filter(user => user.usuario.toUpperCase().includes(texto.toUpperCase())                     ///indexOf(texto) >- 1
      )
      
    }
  
}