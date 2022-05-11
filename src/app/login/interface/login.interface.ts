


export interface LoginUsuario {
    email: string;
    password: string;
}

export interface LoginResponse {
    estadoMsg: boolean;
    msg: string;    
    uid: number;
    idRol: number;    
    nombre: string;
    email: string;
    password?: string;
    usuarioActivo?: string;
    usuarioNoActivo?: string;    
    apiKey: string;
    estado?: boolean;    
}

export interface Usuario {
    uid: number;
    idRol: number;
    correoUsuario: string;
    password?: string;
    nombre: string;
    usuarioActivo: string;
    usuarioNoActivo: string; 
    estado?: boolean;
    apiKey: string;
}

export interface RegistrarUsuario {    
    idRol: number;
    correoUsuario: string;
    password: string; 
    nombreUsuario: string;
    estado: boolean;
    activacionUsuario?: string;
    desactivacionUsuario?: string;
    estadoMsg: boolean;
}

export interface ConneccionUsuario {
    email: string;
    estado?: string;
    msg?: string;
}

export interface Roles {
    idRol: number;
    rol: string;
    descripcion: string; 
}

export interface UsuarioModificar {
    idUsuario: number;
    idRol: number;
    correoUsuario: string;
    password: string; 
    password2: string;
    nombreUsuario: string;
    desactivacionUsuario: string; 
    estado: boolean;     
}

export interface ModificarActivacion {
    idUsuario: number;
    desactivacionUsuario: string; 
    estado: boolean;   
}

export interface ModificarPassword {
    idUsuario: number;
    password: string; 
    password2: string;
}