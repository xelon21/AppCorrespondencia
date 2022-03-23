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
}

