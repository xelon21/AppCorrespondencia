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
  .ancho4 {
      width: 1400px;
      margin-left: 550px;
      background-color: #efefef;
      height: 860px;
    }

    .espacio {
     padding-left: 45%;
    }
    
    .ancho{
      width: 1400px;
    } 
  
  `]
})
export class FiltrarComponent implements OnInit {
  /**Se declaran las varibles a utilizar */
  correos: Correspondencia[] = [];  
  filtro: string = '';
  hayError: boolean = false;  
  pagina: number = 0;
  search: string = '';

  /**Se declaran las clases a utilizar  */
  constructor( private correosService: CorrespondenciaService,
   ) { 
    
  }

  /**Se inician los metodos */
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

  /**Metodo que permite mostrar la siguiente lista con datos */
  nextPage() {
    this.pagina += 10;
  }

  /**Metodo que permite mostrar la lista anterior con datos */
  prevPage() {
    if ( this.pagina > 0){
      this.pagina -= 10;
    }
  }

  /** Metodo que permite filtrar mediante un pipe por nombre de documento
  */
  onSearchNombreUsuario( search: string) {
    this.pagina = 0;
    this.search = search;
  }   
}