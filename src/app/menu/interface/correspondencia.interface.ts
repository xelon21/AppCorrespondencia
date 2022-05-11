export interface Correspondencia {
    nombreDocumento:   string;
    nombreEnvio:       string;
    usuario:           string;
    destinatario:      string;
    referencia:        string;
    fecha:             string;
    correlativo:       string;
    estadoCorreo:      string;
}

export interface CorrespondenciaB {
    idTipoDocumento:   number;
    idTipoEnvio:       number;
    usuario:           string;
    destinatario:      string;
    referencia:        string;
    fecha:             string;
    correlativo:       string;
    estadoCorreo:      string;
    us: string;
}

export interface AgregarCorrespondencia {
    idTipoDocumento: number;
    idTipoEnvio: number;
    usuario: string;
    destinatario: string;
    referencia: string;
    correlativo?: string;
}

export interface TipoEnvio {
    idTipoEnvio: number;
    nombreEnvio: string;
    descripcion: string;
}

export interface TipoDocumento {
    idTipoDocumento: number;
    nombreDocumento: string;
    abreviacion:     string;
    descripcion:     string;
}

export interface CorrespondenciaModificar {
    correlativo:       string;
    idTipoEnvio:       number;
    usuario:           string;
    destinatario:      string;
    referencia:        string;   
    estadoCorreo:      string;
    us: string;
}

export interface Correlativo {
    correlativo: string; 
}


export interface FormatoFecha {
    year: string,
    month: number,
    date: string
}



