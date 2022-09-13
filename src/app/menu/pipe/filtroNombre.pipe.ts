import { Pipe, PipeTransform } from "@angular/core";
import { Correspondencia, CorrespondenciaSqlServer } from '../interface/correspondencia.interface';


@Pipe({
    name: 'searchNombre'
})
export class FiltroNombrePipe implements PipeTransform {

    transform( lista: CorrespondenciaSqlServer[], page: number = 0, search: string = '' ): any[] { 
      if( search.length === 0 )
      return lista.slice( page, page + 10 );

      const usuarioFiltrado = lista.filter( nombre => nombre.usuarios.nombreUsuario.toUpperCase().includes( search.toUpperCase() ));

      return usuarioFiltrado.slice(page, page += 10);
    }
  
}