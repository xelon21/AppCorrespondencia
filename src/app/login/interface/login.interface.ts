


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
    email: string;
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
}

export interface Roles {
    idRol: number;
    rol: string;
    descripcion: string; 
}