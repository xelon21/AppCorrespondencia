
export interface CorrespondenciaSqlServer {
    idCorrespondencia: number;
    idTipoDocumento:   number;
    idTipoEnvio:       number;
    idUsuario:         number;
    destinatario:      string;
    referencia:        string;
    fecha:             Date;
    correlativo:       string;
    estadoCorreo:      string;
    tipoDocumento:     TipoDocumentoSqlServer;
    tipoEnvio:         TipoEnvioSqlServer;
    usuarios:          UsuariosSqlServer;
}

export interface TipoDocumentoSqlServer {
    idTipoDocumento: number;
    nombreDocumento: string;
    abreviacion:     string;
    descripcion:     string;
}

export interface TipoEnvioSqlServer {
    idTipoEnvio: number;
    nombreEnvio: string;
    descripcion: string;
}

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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



