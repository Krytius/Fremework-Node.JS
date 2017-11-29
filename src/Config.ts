export class Config {
    public static DEBUG = true;
    public static PORT = 3000;
    
    public static URL_API_PREFIX= 'api';
    
    public static DatabaseType = 'mysql'; 
    public static Connection = {
        host: 'localhost',
        user: 'root',
        password: 'as',
        database: 'mc'
    };
    public static SocketIO = true;




}