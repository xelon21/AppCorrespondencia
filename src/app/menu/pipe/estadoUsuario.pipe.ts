import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'estado'
})
export class estadoUsuarioPipe implements PipeTransform {

    transform( valor2: boolean): string {
        if(valor2){
            return 'ACTIVO';
        } else {
            return 'INACTIVO'
        }

    }

    // transform2( valor: boolean): string {

    //     if(valor){
    //         return 'ACTIVO';
    //     }else {
    //         return 'INACTIVO';
    //     }
    // }

    

}