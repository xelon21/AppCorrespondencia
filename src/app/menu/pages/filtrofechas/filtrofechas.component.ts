import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Correspondencia, FormatoFecha } from '../../interface/correspondencia.interface';
import { CorrespondenciaService } from '../../services/correspondencia.service';

@Component({
  selector: 'app-filtrofechas',
  templateUrl: './filtrofechas.component.html',
  styles: [`

.fil {
    margin-left: 35px;
    width: 40%;
  }

  .busqueda {
      margin-left: 1%;
      width: 25%;
    }

  .textoFiltro {
    margin-left: 30px;
  }

  
  .filtroFecha {
    margin-left: 35px;
  }
  
  .separacionIconos {
    margin-right: 5px;
  }
  
  .fondoEncabezados {
      background-color: #4D66F9;
      font-family: Roboto;
      
    }
  
   #miTablaPersonalizada th {
      width: 50px;
      font-weight: normal;
    }
  
    .centrarTexto {
      text-align: center;
    }
   
    #miTablaPersonalizada2 td {
      width: 50px;
      overflow: auto;
      border: 0.1px solid;
      border-bottom: 0.1px solid;
    }

    .ancho3 {
      width: 90%;
    }
   
    .paginacion {
      margin-bottom: 25px;
   
    }
    .paginacion2 {
      margin-bottom: 20px; 
      margin-left: 10px;       
    }
   
    .ancho4 {
      width: 1400px;
      margin-left: 550px;
      background-color: #efefef;
      height: 700px;
    }

    .espacio {
     margin-left: 24%;   

    }
    
    .ancho{
      width: 1400px;
    } 
 
   .example-form-field {
    margin-right: 20px;
  }

  .ancho {
    width: 250px;
    margin-top: 25px;
  }
 
  .ancho3 {
    width: 1400px;
  }

 
  .ancho2 {
    width: 220px;    
  }

  .tablaEspacio {
    margin-left: 10px;
    width: 150%;
  }

  .filtroFecha {
  margin-left: 35px;
}

  
  `]
})
export class FiltrofechasComponent implements OnInit {
// Se establecen las variables a ocupar con el tipo de dato que se 
  // extrae de la interfaz correspondencia
  inicial!: FormatoFecha;
  final!: FormatoFecha;

  // Se establecen las variables para ocupar en el html
  range = new UntypedFormGroup({
    start: new UntypedFormControl(),
    end: new UntypedFormControl(),
  });

  hayError: boolean = false;
  correos: Correspondencia[] = [];
  pagina: number = 0;
  
  /**Se declaran las clases que se utilizaran  */
  constructor(private correoService: CorrespondenciaService) {               
               } 
        
  ngOnInit(): void {
  }

  /**Metodo que permite avanzar en la lista  */
  nextPage() {    
    this.pagina += 8;   
       
  }

  /**Metodo que permite retroceder en la lista */
  prevPage() {
    if ( this.pagina > 0){      
      this.pagina -= 8;
    }
  }

    /* Metodo que permite filtrar un rango de fechas */
  async filtraFechas(){
    // se verifica que los campos no vengan vacios y que no sean nulos    
    if(this.range.controls['start'].valid && this.range.controls['end'].valid &&
        this.range.value.start != null && this.range.value.end != null) {

          /**Se Extraen los datos de los campos y se almacenan en 2 variables para poder trabajarlos */
          this.hayError = true;
          this.inicial = this.range.value.start._i;
          this.final = this.range.value.end._i; 
      
          /** Se les da formato a las fechas para trabajar con ellas de mejor manera */
          let fechaInicio: string = this.inicial.year + '-' + (this.inicial.month + 1 ).toString() + '-' + this.inicial.date;
          let fechaFinal: string = this.final.year + '-' + (this.final.month + 1 ).toString() + '-' + this.final.date;
   
          /**Una vez trabajados los datos, se envian por parametros al filtro de fecha para poder mostrar las correspondencias
           * Segun el rango de fechas ingresado
           */
          await this.correoService.filtroFechas( fechaInicio, fechaFinal )
            .subscribe( datos => {              
              this.correos = datos;   
              //console.log(datos)           
            })
        }   
  }

  
  }



  /** El codigo del demonio que siempre que pienso que voy a poder ocuparlo
   * resulta que al final ni lo necesito :c
   * 
   * 
    formato(fecha: string) :string {
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


