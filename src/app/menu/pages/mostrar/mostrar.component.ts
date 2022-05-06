import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Correspondencia, Correlativo } from '../../interface/correspondencia.interface';
import { CorrespondenciaService } from '../../services/correspondencia.service';
import { AgregarComponent } from '../agregar/agregar.component';

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
    margin-left: 50px;
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

export class MostrarComponent implements OnInit, OnDestroy {

  correos: Correspondencia[] = [];
  suscription!: Subscription;

  
  constructor( private correosService: CorrespondenciaService, 
               private router: Router,
               private correlativoComponent: AgregarComponent ) { }

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
