import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Correspondencia, FormatoFecha } from '../interface/correspondencia.interface';
import { CorrespondenciaService } from '../services/correspondencia.service';


@Component({
  selector: 'app-filtro-fechas',
  templateUrl: './filtro-fechas.component.html',
  styles: [`
  .example-form-field {
    margin-right: 20px;
  }

  .ancho {
    width: 125%;    
  }
  `]
})

export class FiltroFechasComponent implements OnInit {

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
  
  constructor(private correoService: CorrespondenciaService) { } 

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
         
          let fechaInicio: string = this.inicial.year + '-' + (this.inicial.month + 1 ).toString() + '-' + this.inicial.date;
          let fechaFinal: string = this.final.year + '-' + (this.final.month + 1 ).toString() + '-' + this.final.date;
 
                  
          await this.correoService.filtroFechas( fechaInicio, fechaFinal )
            .subscribe( datos => {              
              this.correos = datos;              
            })  
        }   
  }
}
