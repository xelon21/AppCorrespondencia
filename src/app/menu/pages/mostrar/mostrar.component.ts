import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Correspondencia } from '../../interface/correspondencia.interface';
import { CorrespondenciaService } from '../../services/correspondencia.service';


@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
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
    .boto{
      width: 300px;
    }
    .ancho3{
      width: 800px;
    }
    
    .espacio {
     margin-left: 30px;
    }
    .ancho2 {
      width: 1320px;
      margin-right: 100%;
    }
    .ancho{
      width: 165%;
    } 
    .paginacion {      
      margin-left: 25%;
    }
    .paginacion2 {     
      margin-left: 10px;       
    }
    .volver {
      margin-left: 25%;
    }
   
    
 
.bobi{
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    background-color: #f5f5f5;
  }
  
.mat-row .mat-cell {
  border-bottom: 2px solid transparent;
  border-top: 2px solid transparent;
  cursor: pointer;
}
.mat-row:hover .mat-cell {
  border-color: currentColor;
}
  
`]
})

export class MostrarComponent implements OnInit, OnDestroy {

  correos: Correspondencia[] = [];
  suscription!: Subscription;
  pagina: number = 0;

  
  constructor( private correosService: CorrespondenciaService, 
               private router: Router) { }

  ngOnInit(): void {

    // Se trae todas las correspondencias
    this.correosService.getCorrespondencia()
      .subscribe( correos =>{
        this.correos = correos        
      }); 
    
    this.suscription = this.correosService.refrescar
      .subscribe( () => {
        this.correosService.getCorrespondencia()
            .subscribe( correos =>{
              this.correos = correos        
              console.log(this.correos)
            });
          })
  }

  nextPage() {    
    this.pagina += 10;    
  }

  prevPage() {
    if ( this.pagina > 0){
      this.pagina -= 10;
    }
  }

  /** Revisar el AdministrarComponente, Ahi se explica que hace 
   * este metodo xD 
   */
  ngOnDestroy(): void {    
    this.suscription.unsubscribe();
  }

  /** Metodo que envia el correlativo de la correspondencia seleccionada 
   * al formulario para poder modificar dicha correspondencia
   */
  modificar(correlativo: string){
    this.router.navigate(['/correspondencia/modificar', correlativo]);   
  }
}
