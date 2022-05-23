import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SesionesService } from '../../../login/services/sesiones.service';
import { Roles, Usuario } from '../../../login/interface/login.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';

import { NgbCalendar, NgbDate, NgbDateStruct, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormatoFecha } from '../../interface/correspondencia.interface';
import { Subscription } from 'rxjs';




@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';  
  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';  
  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10),
      };      
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {   
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';

  }
}


@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styles:[`

  .paginacion{
    width: 80px;
  }

  .fondoEncabezados {
    background-color: #4D66F9;
    font-family: Roboto;
    
  }

  #miTablaPersonalizada th {
    width: 20px;
    font-weight: normal;
  }

  .centrarTexto {
    text-align: center;
  }

 
  #miTablaPersonalizada2 td {
    width: 20px;
    overflow: auto;
    border: 1px solid;
    border-bottom: 1px solid;
  }

  .btn {
    margin-right: 10px;
    width: 180px;
  }

  .anchoAlerta {
    height: 35px;
    text-align: center;

  }

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
      background-color: #efefef;
    }

    .busqueda {
      margin-left: 1%;
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
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ] 
})
export class AdministracionComponent implements OnInit {

  usuarioActivo!: string; 
  usuarioNoActivo!: string;
  pagina: number = 0;
  search: string = '';

  fecha1!: FormatoFecha;

  formato!: string;
  anio!: string;
  mes!: string;
  dia!: string; 

  userActivo!: string;
  userNoActivo!: string;
  usuario: Usuario[] = [];
  estadoCorreo!: boolean;
  roles: Roles[] = [];
  users: Usuario[] = [];
  hayError: boolean = false;
  filtroNombre: string = '';
  suscription!: Subscription;
 

  registroUsuario: FormGroup = this.fb.group({
    idRol: [0 ,[Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(3) ]],
    password: ['', [Validators.required, Validators.minLength(3) ]],
    password2: ['', [Validators.required, Validators.minLength(3) ]],
    nombreUsuario: ['', [Validators.required, Validators.minLength(3) ]],
    estado: [ false ],
    usuarioActivo: [],
    usuarioNoActivo: [''],
  })

  constructor(private fb: FormBuilder,
              private loginService: SesionesService,
              private ngbCalendar: NgbCalendar,
              private dateAdapter: NgbDateAdapter<string>) { }

  ngOnInit(): void {
   
    /**Metodo que trae los roles  */
    this.loginService.traeRoles()
        .subscribe( datos => { this.roles = datos })
    /**Metodo que trae a los usuarios */
    this.loginService.obtenerUsuarios()
        .subscribe( datos => {          
           this.users = datos 
          })
    /** Metodo que permite hacer Refresh 
     * de la tabla de usuarios al agregar un usuario */
    this.suscription = this.loginService.refrescar
        .subscribe( () => {    
            this.loginService.obtenerUsuarios()
                .subscribe( datos => { this.users = datos })    
    })    
  }

  /** Metodo necesario para que se pueda refrescar la lista de usuarios al agregar un usuario
   * Se hace un unsubscribe dentro del ngOnDestroy para que se desuscriba a la promesa del metodo
   * que permite refrescar la lista para volver a actualizarla una ves que se agregue un usuario
   */
  ngOnDestroy(): void {    
    this.suscription.unsubscribe();
  }

  nextPage() {
    this.pagina += 5;
  }

  prevPage() {
    if ( this.pagina > 0){
      this.pagina -= 5;
    }
  }

  onSearchNombreUsuario( search: string) {
    this.pagina = 0;
    this.search = search;
  }
 
  
  /** Este get trae la fecha actual para poder ingresarla
   * al registrar un usuario.
   */
  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

  /** Se le da formato a la fecha para poder extraerla del formulario */
  fecha = new FormGroup({
    activacionUsuario: new FormControl()    
  });
  
  cargarLista() {
    this.hayError = false;
    this.suscription = this.loginService.obtenerUsuarios()  
    .subscribe( datos => {
      this.users = datos
    }) 
  }

  /** Metodo que registra un usuario */
  async ingresar(){    
    // Se extraen los datos del formulario
    const { idRol, email, password, nombreUsuario , estado, password2 } = this.registroUsuario.value;
    try {  
        
      /** Se corrobora que las 2 contraseñas sean identicas */
         if( password === password2){
           
          /** Se extrae la fecha del formulario y se le da formato para poder trabajarla
           * Cabe decir que en este caso Mysql recive la fecha de la forma [YYYY-MM-DD]
           * y el formulario la entra de otra forma, por lo que se trabaja la fecha para 
           * poder hacer la insercion mas tarde.
           */
          this.fecha1 = this.fecha.controls['activacionUsuario'].value._i
          let fechaActivacion: string = this.fecha1.year + '-' + (this.fecha1.month + 1 ).toString() + '-' + this.fecha1.date;    
          let diaActual = new Date().getDate().toString()
          let mesActual = new Date().getMonth()
          let anioActual = new Date().getFullYear().toString()          
          let fechaActual =+ anioActual + '-' + +(mesActual + 1).toString() + '-' + diaActual; 
          
          /** En el caso de que la fecha seleccionada de activacion sea igual a la de ahora, el usuario
           *  quedara ingresado como ACTIVO.
           */
          if(fechaActivacion === fechaActual){
            let activo = 1;
            /** Se extrae el nombre de usuario del servicio login para poder ingresarlo a la correspondencia.
             * Se debe tener en cuenta que toma el usuario que se encuentre logeado en el momento*/
            this.loginService.registrarUsuario( idRol, email, password, nombreUsuario, activo, fechaActivacion )
            .subscribe( resp => {              
              if(resp){
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Usuario Guardado Con Exito',
                  showConfirmButton: false,
                  timer: 1500
                }) 
              }else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'El usuario ya existe',                
                })
              }
            })
          }else {
            /** Caso contrario enb el que la fecha no es igual a la fecha del dia de hoy,
             * El usuario ingresado quedara INACTIVO hasta el dia de la fecha seleccionada
             * en el formulario de ingreso
             */
            this.loginService.registrarUsuario( idRol, email, password, nombreUsuario, estado, fechaActivacion )
            .subscribe( resp => {             
              if(resp){
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Usuario Guardado Con Exito',
                  showConfirmButton: false,
                  timer: 1500
                }) 
              }else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'El usuario ya existe',                
                })
              }
            })
          }  
        }else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden',                
          })
        }
        
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debe ingresar datos para registrar un usuario',                
        })
        
      }
  }

}



/** CODIGO QUE NO SE OCUPA PERO PODRIA OCUPARSE */
/** datos necesarios para poder mostrar la informacion en la tabla del html
 * 
 */
// dataSource = this.users;
// columnsToDisplay = ['IdUsuario','Rol', 'NombreUsuario', 'Email', 'Estado', 'FechaActivacion', 'FechaDesactivacion', 'acciones'];
// expandedElement!: Usuario | null;

// FormatoFecha( fecha: string ): string{     
  
  
  
  /** Metodo que permite filtrar un usuario por nombre. */
  // async filtrarPorNombreUsuario() { 
     
  //   await this.loginService.buscaUsuario(this.filtroNombre)
  //       .subscribe( users => {         
  //           this.hayError = false;
  //           this.users = users
  //         }, (err) => {
  //           this.hayError = true;         
  //         })
            
  // }
//   if(fecha){
//     this.formato = '';
//     this.anio = '';
//     this.mes= '';
//     this.dia= '';  
//     for (let i= 0; i < fecha.length; i++) {   
  //       if( i >= 4 && i <= 9){
    //         if(fecha[i] === '-'){
      //           this.anio = '';
      //         }else {
        //           this.anio += fecha[i];          
//         }
//       }else if( i >= 2 && i <= 4 ){
//         if( fecha[i] != '-' ){ 
  //             this.mes += fecha[i];
  //             i++;
  //             if( fecha[i] != '-'){
    //               this.mes += fecha[i];
    //               i++;
    //             }else{
      //               if( fecha[i] === '-' ){
//                 this.mes = '';
//                 this.mes += '0' + fecha[2];
//               }
//             }
//         }else {
  //           i++;
//           if(fecha[i] != '-'){
  //             this.mes += fecha[i];   
//             i++;
//             if(fecha[i] != '-'){
  //               this.mes += fecha[i]; 
  //             }else{
    //               this.mes = '';
    //               this.mes += '0'+ fecha[3];               
    //             }
    //           }
    //         }
    //       }else if( i >= 0 && i <= 1){
      //         if( fecha[i] === '-'){
        //           this.dia = '';
        //           this.dia += '0' + fecha[0]          
        //         }else {
          //           this.dia += fecha[i];          
          //         }
          //       }
          //     }     
          //     return this.formato += this.anio + '-' + this.mes + '-' + this.dia ;
          //   }else{
            //     return '2023-01-01';
            //   } 
            // }
            