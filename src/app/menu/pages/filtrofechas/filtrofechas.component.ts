import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Correspondencia, FormatoFecha } from '../../interface/correspondencia.interface';
import { CorrespondenciaService } from '../../services/correspondencia.service';

@Component({
  selector: 'app-filtrofechas',
  templateUrl: './filtrofechas.component.html',
  styles: [`
   .example-form-field {
    margin-right: 20px;
  }

  .ancho {
    width: 220px;    
  }

  .ancho2 {
    width: 220px;    
  }

  .tablaEspacio {
    margin-left: 300px;
    width: 100%;
  }
  
  `]
})
export class FiltrofechasComponent implements OnInit {
// Se establecen las variables a ocupar con el tipo de dato que se 
  // extrae de la interfaz correspondencia
  inicial!: FormatoFecha;
  final!: FormatoFecha;

  // Se establecen las variables para ocupar en el html
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  hayError: boolean = false;
  correos: Correspondencia[] = [];
  
  constructor(private correoService: CorrespondenciaService) {               
               } 
        
  ngOnInit(): void {
  }
    /* Metodo que permite filtrar un rango de fechas */
  async filtraFechas(){
    // se verifica que los campos no vengan vacios    
    if(this.range.controls['start'].valid && this.range.controls['end'].valid &&
        this.range.value.start != null && this.range.value.end != null) {

          this.hayError = true;
          this.inicial = this.range.value.start._i;
          this.final = this.range.value.end._i; 
      
          /** Se les da formato a las fechas para trabajar con ellas de mejor manera */
          let fechaInicio: string = this.inicial.year + '-' + (this.inicial.month + 1 ).toString() + '-' + this.inicial.date;
          let fechaFinal: string = this.final.year + '-' + (this.final.month + 1 ).toString() + '-' + this.final.date;
   
          await this.correoService.filtroFechas( fechaInicio, fechaFinal )
            .subscribe( datos => {              
              this.correos = datos;              
            })
        }   
  }

  
  }



  /** El codigo del demonio que siempre que pienso que voy a poder ocuparlo
   * resulta que al final ni lo necesito :c
   * 
   * formato(fecha: string) :string {
    let formato: string;
    let anio: string;
    let mes: string;
    let dia: string
    
    if(fecha){
      formato = '';
      anio = '';
      mes= '';
      dia= '';  
      for (let i= 0; i < fecha.length; i++) {   
          if( i >= 4 && i <= 9){
              if(fecha[i] === '-'){
                  anio = '';
                }else {
                    anio += fecha[i];          
          }
        }else if( i >= 2 && i <= 4 ){
          if( fecha[i] != '-' ){ 
                mes += fecha[i];
                i++;
                if( fecha[i] != '-'){
                    mes += fecha[i];
                    i++;
                  }else{
                      if( fecha[i] === '-' ){
                  mes = '';
                  mes += '0' + fecha[2];
                }
              }
          }else {
              i++;
            if(fecha[i] != '-'){
                mes += fecha[i];   
              i++;
              if(fecha[i] != '-'){
                  mes += fecha[i]; 
                }else{
                    mes = '';
                    mes += '0'+ fecha[3];               
                  }
                }
              }
            }else if( i >= 0 && i <= 1){
                if( fecha[i] === '-'){
                    dia = '';
                    dia += '0' + fecha[0]          
                  }else {
                      dia += fecha[i];          
                    }
                  }
                }     
                return formato += anio + '-' + mes + '-' + dia ;
              }else{
                  return '2023-01-01';
                } 
              }
            
   */


