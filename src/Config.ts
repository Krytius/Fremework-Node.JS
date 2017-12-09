export class Config {
    public static DEBUG = true;
    public static PORT = 3000;

    public static URL_API_PREFIX = 'api';

    public static DatabaseType = 'mysql';
    public static Connection = {
        host: 'localhost',
        user: 'root',
        password: '100193',
        database: 'TESTE'
    };
    public static SocketIO = true;


    public static KEY = "teste";
    public static TOKEN_EXPIRATION_MINUTES = 5;

}