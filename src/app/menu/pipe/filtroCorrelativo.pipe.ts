import { Pipe, PipeTransform } from "@angular/core";
import { Correspondencia } from "../interface/correspondencia.interface";


@Pipe({
    name: 'filtroCorrelativo'
})
export class FiltroCorrelativoPipe implements PipeTransform {

  transform( lista: Correspondencia[], page: number = 0, search: string = '' ): any[] { 
    if( search.length === 0 )
    return lista.slice( page, page + 10 );

    const correlativoFiltrado = lista.filter( nombre => nombre.NombreDocumento.toUpperCase().includes( search.toUpperCase() ));

    return correlativoFiltrado.slice(page, page += 10);
  }

}