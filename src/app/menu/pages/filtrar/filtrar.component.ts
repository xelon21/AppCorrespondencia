import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FiltroFechasComponent } from '../../filtro-fechas/filtro-fechas.component';
import { Correspondencia } from '../../interface/correspondencia.interface';
import { CorrespondenciaService } from '../../services/correspondencia.service';

@Component({
  selector: 'app-filtrar',
  templateUrl: './filtrar.component.html',
  styles: [`

  
.ancho{
    width: 140%;
  } 
 
  `]
})
export class FiltrarComponent implements OnInit {

  correos: Correspondencia[] = [];  
  filtro: string = '';
  hayError: boolean = false;
  

  constructor( private correosService: CorrespondenciaService,
               private dialog: MatDialog) { 
    
  }

  ngOnInit(): void {     
    this.traeCorrespondencia();
  }  

  /** Metodo que despliega el cuadro de dialogo el cual filtra por rango de fechas */
  openDialog() {  
    this.dialog.open(FiltroFechasComponent,
       {
      width:'1250px',
      disableClose: true     
    });
    /** Al dia de hoy 13/05/2022, Todavia no logro desifrar como hacer
     * que el dialogo de angular material se cierre cuando se hace click
     * fuera de el. De momento solo se cierra si el usuario hace click en
     * el boton VOLVER.
     */
  }
  
  /** Metodo que trae todas las correspondencias */
  async traeCorrespondencia(){
    
    await this.correosService.getCorrespondencia()
      .subscribe( correos =>{
        this.correos = correos     
      });  
  }

  /** Metodo que filtra por correlativo  */
  async filtrarPorCorrelativo() {  
    await this.correosService.filtroCorrelativo(this.filtro)
        .subscribe( correos => {
          if(!correos){                        
            this.hayError = false;
          }else {
            this.hayError = true
            this.correos = correos   
          }  
        })
  }
}
