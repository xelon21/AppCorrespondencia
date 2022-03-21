import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Correspondencia } from '../../interface/correspondencia.interface';
import { CorrespondenciaService } from '../../services/correspondencia.service';

@Component({
  selector: 'app-filtrar',
  templateUrl: './filtrar.component.html',
  styles: [`
  td {
    text-align: center;
  }
  th {
    text-align: center;
  }
  `]
})
export class FiltrarComponent implements OnInit {

  correos: Correspondencia[] = [];
  filtrar: string = '';
  hayError: boolean = false;
  datasource: Correspondencia[] = []

  constructor( private correosService: CorrespondenciaService ) { 
    
  }


  ngOnInit(): void {
    
    this.traeCorrespondencia();
  }
  
  traeCorrespondencia(){
    
    this.correosService.getCorrespondencia()
      .subscribe( correos =>{
        this.correos = correos
        console.log(this.correos)
      });  

  }

  // buscar() {
  //   this.hayError = false;
  //   console.log(this.filtrar);

  //   this.correosService.buscaCorrelativo( this.filtrar )
  //     .subscribe( (correspondencia) => {       
  //       this.correos = correspondencia;        
  //       this.datasource = this.correos;
  //     }, (err) => {              
  //       this.hayError = true;
  //       this.correos = [];
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'ERROR',
  //         text: 'El correlativo ingresado no existe',          
  //       });  
  //     });      

  // }

  displayedColumns: string[] = ['Usuario', 'NombreDocumento', 'TipoEnvio', 'Destinatario', 'Referencia', 'Fecha', 'Correlativo', 'EstadoCorreo', 'acciones'];

}
