import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SesionesService } from '../../../login/services/sesiones.service';
import { RegistrarUsuario, Roles, Usuario } from '../../../login/interface/login.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styles:[`

  *{
    padding: 0;
    margin: 0;
    }
    html, body, section {
        height: 100%;
        min-height: 100%;
    }
    body{
        background-color: lightgray;
    }
  .spacer2 {
    flex: 2 2 auto;
   }

   .input {
     margin-right: 50px;
   }

    .ancho {
      width: 80%;
    }
    .ancho2 {
      width: 175%;
    }
    .ancho3 {
      width: 150%;
      margin-left: 230px;
    }
    .ancho4 {
      width: 175%;
      background-color: lightgray;
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

  usuarioActivo!: NgbDateStruct;
  usuarioNoActivo!: NgbDateStruct;

  public isCollapsed = false;

  existe!: boolean;
  userActivo!: string;
  userNoActivo!: string;
  usuario: Usuario[] = [];
  estadoCorreo!: boolean;
  roles: Roles[] = [];
  users: Usuario[] = [];
  filtro: string = '';

  registroUsuario: FormGroup = this.fb.group({
    idUsuario: 0,
    idRol: 0,
    email: '',
    password: '',
    password2: '',
    nombreUsuario: '',
    estado: false,
    usuarioActivo: '',
    usuarioNoActivo: ''
  })

  constructor(private fb: FormBuilder,
              private loginService: SesionesService) { }

  ngOnInit(): void {

    this.loginService.traeRoles()
        .subscribe( datos => { this.roles = datos })
    
    this.loginService.obtenerUsuarios()
        .subscribe( datos => { this.users = datos })  
    
  }

  async filtrarPorCorrelativo() {  
    await this.loginService.buscaUsuario(this.filtro)
        .subscribe( users => {
          if(users){           
             this.users = users  
          }else { 
            Swal.fire(
              'El nombre de usuario no se encuentra',
              'question'
            )           
          }  
        })
  }
  
  registrar(){
    console.log(this.registroUsuario.value)
  }

  fechaDesactivacion() {

  }
  

  async ingresar(){
    
    // Se extraen los datos del formulario
    const { idUsuario, idRol, email, password, nombreUsuario , estado, usuarioActivo, usuarioNoActivo } = this.registroUsuario.value;
    
    this.userActivo = usuarioActivo._i.year + '-' + (usuarioActivo._i.month +1).toString() + '-' + usuarioActivo._i.date;
    this.userNoActivo = usuarioNoActivo._i.year + '-' + (usuarioNoActivo._i.month +1).toString() + '-' + usuarioNoActivo._i.date;
  
    try {
       
        console.log(idUsuario, idRol, email, password, nombreUsuario , estado, this.userActivo, this.userNoActivo )
    
        /** Se extrae el nombre de usuario del servicio login para poder ingresarlo a la correspondencia.
         * Se debe tener en cuenta que toma el usuario que se encuentre logeado en el momento*/
        // this.loginService.registrarUsuario( idUsuario, idRol, email, password, nombreUsuario, estado, this.userActivo, this.userNoActivo )
        // .subscribe( resp => {
        // //  if(!this.existe){
        //     Swal.fire({
        //       position: 'top-end',
        //       icon: 'success',
        //       title: 'Usuario Guardada Con Exito',
        //       showConfirmButton: false,
        //       timer: 1500
        //     }) 
        //  // }
        // });
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debe ingresar datos para registrar un usuario',                
        })
           
    }
  }


  dataSource = this.users;
  columnsToDisplay = ['IdUsuario','Rol', 'NombreUsuario', 'Email', 'Estado', 'FechaActivacion', 'FechaDesactivacion', 'acciones'];
  expandedElement!: Usuario | null;
}
