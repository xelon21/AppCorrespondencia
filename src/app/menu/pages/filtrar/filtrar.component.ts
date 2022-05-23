import { Component, OnInit } from '@angular/core';
import { Correspondencia } from '../../interface/correspondencia.interface';
import { CorrespondenciaService } from '../../services/correspondencia.service';

@Component({
  selector: 'app-filtrar',
  templateUrl: './filtrar.component.html',
  styles: [`
.fil {
  margin-left: 35px;
  width: 40%;
}

.filtroFecha {
  margin-left: 35px;
}

.busqueda {
      margin-left: 1%;
      width: 25%;
    }

  .textoFiltro {
    margin-left: 30px;
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
  
  .ancho{
    width: 140%;
  } 
 
  `]
})
export class FiltrarComponent implements OnInit {

  correos: Correspondencia[] = [];  
  filtro: string = '';
  hayError: boolean = false;  
  pagina: number = 0;
  search: string = '';

  constructor( private correosService: CorrespondenciaService,
   ) { 
    
  }

  ngOnInit(): void {     
    this.traeCorrespondencia();
  }  

  /** Metodo que trae todas las correspondencias */
  async traeCorrespondencia(){
    
    await this.correosService.getCorrespondencia()
      .subscribe( correos =>{
        this.correos = correos     
      });  
  }
  nextPage() {
    this.pagina += 10;
  }

  prevPage() {
    if ( this.pagina > 0){
      this.pagina -= 10;
    }
  }

  onSearchNombreUsuario( search: string) {
    this.pagina = 0;
    this.search = search;
  }   
}