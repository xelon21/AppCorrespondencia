import { Component, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Correspondencia } from '../interface/correspondencia.interface';

@Component({
  selector: 'app-tabla',
  templateUrl: './tablaCorrespondencia.component.html',  
  styles: [`
  
  .example-container {
  height: 400px;
  overflow: auto;
}

 
  table {
  width: 100%;
}

tr.example-detail-row {
  height: 0;
}

tr.example-element-row:not(.example-expanded-row):hover {
  background: whitesmoke;
}

tr.example-element-row:not(.example-expanded-row):active {
  background: #efefef;
}

.example-element-row td {
  border-bottom-width: 0;
}

.example-element-detail {
  overflow: hidden;
  display: flex;
}

.example-element-diagram {
  min-width: 80px;
  border: 2px solid black;
  padding: 8px;
  font-weight: lighter;
  margin: 8px 0;
  height: 104px;
}

.example-element-symbol {
  font-weight: bold;
  font-size: 40px;
  line-height: normal;
}

.example-element-description {
  padding: 16px;
}

.example-element-description-attribution {
  opacity: 0.5;
}
  `],  
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TablaCorrespondenciaComponent {

  @Input() correos: Correspondencia[] = [];

  // Declaracion de variables para poder utilizar los campos en el html
  dataSource = this.correos;
  columnsToDisplay = ['usuario', 'nombreDocumento', 'tipoEnvio', 'destinatario', 'referencia', 'fecha', 'correlativo', 'estadoCorreo', 'acciones'];
  expandedElement!: Correspondencia | null;

}



