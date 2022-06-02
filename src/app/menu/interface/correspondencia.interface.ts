export interface Correspondencia {
    nombreDocumento:   string;
    nombreEnvio:       string;
    nombreUsuario:     string;
    destinatario:      string;
    referencia:        string;
    fecha:             string;
    correlativo:       string;
    estadoCorreo:      string;
} 

export interface CorrespondenciaB {
    idTipoDocumento?:  number;
    idTipoEnvio:       number;
    idUsuario:         number;
    destinatario:      string;
    referencia:        string;
    fecha?:            string;
    correlativo:       string;
    estadoCorreo:      string;

}
export interface CorrespondenciaModificar {
    correlativo:       string;
    idTipoEnvio:       number;
    idUsuario:         number;
    destinatario:      string;
    referencia:        string;   
    estadoCorreo:      string;
    
}

export interface AgregarCorrespondencia {
    idTipoDocumento: number;
    idTipoEnvio: number;
    idUsuario: number;
    destinatario: string;
    referencia: string;
    correlativo?: string;
}

export interface TipoEnvio {
    idtipoEnvio: number;
    nombreEnvio: string;
    descripcion: string;
}

export interface TipoDocumento {
    idtipoDocumento: number;
    nombreDocumento: string;
    abreviacion:     string;
    descripcion:     string;
}



export interface FormatoFecha {
    year: string,
    month: number,
    date: string
}



