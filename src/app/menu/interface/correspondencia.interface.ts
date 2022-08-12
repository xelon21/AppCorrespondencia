// export interface Correspondencia {
//     nombreDocumento:   string;
//     nombreEnvio:       string;
//     nombreUsuario:     string;
//     destinatario:      string;
//     referencia:        string;
//     fecha:             string;
//     correlativo:       string;
//     estadoCorreo:      string;
// }

export interface Correspondencia {
    NombreDocumento: string;
    TipoEnvio:       string;
    NombreUsuario:   string;
    Destinatario:    string;
    Referencia:      string;
    Fecha:           string;
    Correlativo:     string;
    EstadoCorreo:    string;
}


export interface CorrespondenciaB {
    IdTipoDocumento?:  number;
    IdTipoEnvio:       number;
    IdUsuario:         number;
    Destinatario:      string;
    Referencia:        string;
    Fecha?:            string;
    Correlativo:       string;
    EstadoCorreo:      string;
}

export interface CorrespondenciaModificar {
    Correlativo:       string;
    IdTipoEnvio:       number;
    IdUsuario:         number;
    Destinatario:      string;
    Referencia:        string;   
    EstadoCorreo:      string;    
}

export interface AgregarCorrespondencia {
    IdTIpoDocumento: number;
    IdTipoEnvio: number;
    IdUsuario: number;
    Destinatario: string;
    Referencia: string;
    Correlativo?: string;
}

export interface TipoEnvio {
    IdTipoEnvio: number;
    TipoEnvio: string;
    Descripcion: string;
}

export interface TipoDocumento {
    IdTIpoDocumento: number;
    NombreDocumento: string;
    Abreviacion:     string;
    Descripcion:     string;
}

export interface FormatoFecha {
    year: string,
    month: number,
    date: string
}



