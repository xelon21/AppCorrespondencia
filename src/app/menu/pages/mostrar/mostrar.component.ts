import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { Correspondencia, CorrespondenciaSqlServer, TipoEnvioSqlServer, TipoDocumentoSqlServer } from '../../interface/correspondencia.interface';
import { CorrespondenciaService } from '../../services/correspondencia.service';
import { UsuariosSqlServer } from '../../../login/interface/login.interface';
import { catchError, map } from 'rxjs/operators';


@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styles: [`

.fil {
    margin-left: 35px;
    width: 40%;
  }
 

#miTablaPersonalizada2 td {
    overflow: auto;
    border: 0.1px solid;
    border-bottom: 0.1px solid;
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
        
    }
  
   #miTablaPersonalizada th {
      width: 50px;
      font-weight: normal;
    }
  
    .centrarTexto {
      text-align: center;
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

  /**Se declaran las varibales a utilizar */
  correos: CorrespondenciaSqlServer[] = [];
  suscription!: Subscription;
  pagina: number = 0;
  usuario: UsuariosSqlServer[] = [];
  tipoEnvio: TipoEnvioSqlServer[] = [];
  tipoDocumento: TipoDocumentoSqlServer[] = [];


  /**Se declaran las clases a utilizar */
  constructor( private correosService: CorrespondenciaService, 
               private router: Router) { }

  /** Se inicializan Los Metodos al cargar la pagina */
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
            });
          })    
  }
  
  /**Metodo que permite mostrat la siguiente lista con datos */
  nextPage() {    
    this.pagina += 10;    
  }

  /**Metodo que permite mostrar la lista anterior con datos */
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
