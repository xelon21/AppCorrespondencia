import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    
    const resultFiltro = [];
    for(const correo of value){
      if(correo.Correlativo.indexOf(arg) > -1 ){
        console.log('pipe correo')
      }
    }
  }

}
