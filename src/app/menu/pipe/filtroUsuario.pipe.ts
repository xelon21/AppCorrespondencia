import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'search'
})
export class FiltroUsuarioPipe implements PipeTransform {

    transform( lista: any[], texto: string ): any[] {       
        
      if(!texto) return lista;
      return lista.filter(user => user.nombreUsuario.toUpperCase().includes(texto.toUpperCase())                     ///indexOf(texto) >- 1
      )
      
    }
  
}