import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform( fecha: string ): any { 
    
    if(!fecha){
        return 'no existe fecha';
    }else{
  
        let formato: string;
        let anio: string;
        let mes: string;
        let dia: string

        formato = '';
        anio = fecha.slice(0, 4);
        mes= fecha.slice(5, 7);
        dia= fecha.slice(8, 10);     
        formato = dia + '/' + mes + '/' + anio;
    
        return formato
    }
    
  }

}