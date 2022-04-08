import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Correspondencia } from '../../interface/correspondencia.interface';
import { CorrespondenciaService } from '../../services/correspondencia.service';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styles: [`

.bobi{
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    background-color: #f5f5f5;
  }
  
  .ancho{
    width: 145%;
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

export class MostrarComponent implements OnInit {

  correos: Correspondencia[] = [];

  constructor( private correosService: CorrespondenciaService, 
               private router: Router ) { }

  ngOnInit(): void {

    // Se trae todas las correspondencias
    this.correosService.getCorrespondencia()
      .subscribe( correos =>{
        this.correos = correos        
      }); 
  }

  /** Metodo que envia el correlativo de la correspondencia seleccionada 
   * al formulario para poder modificar dicha correspondencia
   */
  modificar(correlativo: string){
    this.router.navigate(['/correspondencia/modificar', correlativo]);   
  }
}
