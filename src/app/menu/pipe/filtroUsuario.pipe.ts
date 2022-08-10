import { Pipe, PipeTransform } from "@angular/core";
import { Usuario } from '../../login/interface/login.interface';


@Pipe({
    name: 'search'
})
export class FiltroUsuarioPipe implements PipeTransform {

    transform( lista: Usuario[], page: number = 0, search: string = ''  ): any[] {
     
      if( search.length === 0 )
      return lista.slice( page, page + 5 );

      const nombreUsuarioFiltrado = lista.filter( nombre => nombre.NombreUsuario.toUpperCase().includes( search.toUpperCase() ));

      return nombreUsuarioFiltrado.slice(page, page += 5);
     
    }
  
}