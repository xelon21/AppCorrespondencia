
export interface UsuariosSqlServer {
    idUsuario:            number;
    idRol:                number;
    correoUsuario:        string;
    password:             string;
    nombreUsuario:        string;
    estado:               number;
    activacionUsuario:    null;
    desactivacionUsuario: null;
    idRolNavigation:      IDRolNavigation;
}

export interface IDRolNavigation {
    idRol:       number;
    nombreRol:   string;
    descripcion: string;
}

export interface LoginUsuario {
    Email: string;
    Password: string;
}

export interface Login2{
    correoUsuario : string;
    id: number;
    idRol: number;
    token: string;
}

export interface LoginResponse {
    correoUsuario: string;
    token: string;
    IdUsuario: number;
    NombreUsuario: string;
    IdRol:         number;
    Estado:        boolean;
    ApiKey:        string;
    EstadoMsg:     boolean;
}

// export interface LoginResponse {
//     EstadoMsg: boolean;
//     Msg: string;    
//     IdUsuario?: number;
//     IdRol: number;    
//     NombreUsuario: string;
//     Email?: string;
//     Password?: string;
//     UsuarioActivo?: string;
//     UsuarioNoActivo?: string;    
//     ApiKey: string;
//     Estado?: boolean;    
// }

export interface Usuario2 {
    IdUsuario: number;
    IdRol: number;
    CorreoUsuario: string;
    Password?: string;
    NombreUsuario: string;
    ActivacionUsuario: string;
    DesactivacionUsuario: string; 
    Estado?: boolean;
    ApiKey: string;
}

// export interface Usuario {
//     IdUsuario:            number;
//     NombreUsuario:        string;
//     Rol:                  string;
//     CorreoUsuario:        string;
//     Estado:               number;
//     ActivacionUsuario:    Date;
//     DesactivacionUsuario: Date;
// }


export interface Usuario {
    IdUsuario: number;
    IdRol: number;
    Rol?: string;
    CorreoUsuario: string;
    Password?: string;
    NombreUsuario: string;
    ActivacionUsuario: string;
    DesactivacionUsuario: string; 
    Estado?: boolean;
    ApiKey: string;
}

export interface RegistrarUsuario {    
    IdRol: number;
    CorreoUsuario: string;
    Password: string; 
    NombreUsuario: string;
    Estado: boolean;
    ActivacionUsuario?: string;
    DesactivacionUsuario?: string;
    EstadoMsg: boolean;
}

export interface Roles {
    IdRol: number;
    Rol: string;
    Descripcion: string; 
}

export interface UsuarioModificar {
    IdUsuario: number;
    IdRol: number;
    CorreoUsuario: string;
    Password?: string;
    Password2?: string;
    NombreUsuario: string;
    DesactivacionUsuario?: string; 
    Estado?: boolean;     
}

export interface ModificarActivacion {
    IdUsuario: number;
    DesactivacionUsuario: string; 
    Estado: boolean;   
}

export interface ModificarPassword {
    IdUsuario: number;
    Password: string; 
    Password2: string;
}

export interface ModUsuario {
    IdRol: number;
    CorreoUsuario: string;
    NombreUsuario: string;
    IdUsuario: number;
}