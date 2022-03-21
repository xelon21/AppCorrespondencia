import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Correspondencia } from '../../interface/correspondencia.interface';
import { CorrespondenciaService } from '../../services/correspondencia.service';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styles: [`
  .ancho{
    width: 100%;
  } 
  `
  ]
})

export class MostrarComponent implements OnInit {

  //@Input() muestraRegistro: [] =[];

  correos: Correspondencia[] = [];

  constructor( private correosService: CorrespondenciaService, 
               private router: Router ) { }

  ngOnInit(): void {

    this.correosService.getCorrespondencia()
      .subscribe( correos =>{
        this.correos = correos
        console.log(this.correos)
      }); 


  }

  modificar(correlativo: string){
    this.router.navigate(['/correspondencia/modificar', correlativo]);
    console.log(correlativo)
  }
  
  displayedColumns: string[] = ['usuario', 'nombreDocumento', 'tipoEnvio', 'destinatario', 'referencia', 'fecha', 'correlativo', 'estadoCorreo', 'acciones'];
  
}


