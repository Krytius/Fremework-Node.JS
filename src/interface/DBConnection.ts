export enum TypeConnection {
    ALL,
    WRITE,
    READ,
}

export interface DBConnection {
    host: string;
    user: string;
    password: string;
    database: string;
    type: TypeConnection;
}
