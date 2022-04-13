import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'estado'
})
export class estadoUsuarioPipe implements PipeTransform {

    transform( valor: number): string {
        if(valor === 1){
            return 'ACTIVO';
        } else {
            return 'INACTIVO'
        }
    }

}