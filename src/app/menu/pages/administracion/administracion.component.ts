import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SesionesService } from '../../../login/services/sesiones.service';
import { RegistrarUsuario, Roles, Usuario } from '../../../login/interface/login.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styles:[`
    .ancho {
      width: 80%;
    }
    .ancho2 {
      width: 175%;
    }
    .ancho3 {
      width: 50%;
    }

    .salto {
      margin-top: 10px;
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
  `  
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ] 
})
export class AdministracionComponent implements OnInit {

  usuario!: RegistrarUsuario;
  estadoCorreo!: boolean;
  roles: Roles[] = [];
  users: Usuario[] = [];

  loginForm: FormGroup = this.fb.group({
    idUsuario: 0,
    idRol: 0,
    email: '',
    password: '',
    nombreUsuario: '',
    estado: true,
    activacionUsuario: '',
    desactivacionUsuario: ''
  })

  constructor(private fb: FormBuilder,
              private loginService: SesionesService) { }

  ngOnInit(): void {

    this.loginService.traeRoles()
        .subscribe( datos => { this.roles = datos })
    
    this.loginService.obtenerUsuarios()
        .subscribe( datos => { this.users = datos
        console.log(datos) })  

  }

  ingresar(){
    
  }

  dataSource = this.users;
  columnsToDisplay = ['IdUsuario','Rol', 'NombreUsuario', 'Email', 'Estado', 'FechaActivacion', 'FechaDesactivacion', 'acciones'];
  expandedElement!: Usuario | null;
}
