


export interface LoginUsuario {
    email: string;
    password: string;
}

export interface LoginResponse {
    estadoMsg: boolean;
    msg: string;    
    uid: number;
    nombre: string;
    apiKey: string;
    estado?: boolean;    
}

export interface Usuario {
    uid: number;
    email?: string;
    password?: string;
    nombre: string;
    estado?: boolean;
    apiKey: string;
}

export interface registrarUsuario {
    idUsuario: number;
    correoUsuario?: string;
    password?: string; 
    nombreUsuario?: string;
    estado?: boolean;
    activacionUsuario?: Date;
    desactivacionUsuario?: Date;
}