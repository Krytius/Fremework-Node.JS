export class Config {
    public static DIR = __dirname;
    public static DEBUG = true;
    public static PORT = process.env.PORT || 3000;

    public static URL_API_PREFIX = 'api';

    public static DatabaseType = 'mysql';
    public static Connection = process.env.PRODUCTION ?
        {
            host: 'localhost',
            user: 'framework',
            password: 'framework',
            database: 'framework'
        } : {
            host: 'localhost',
            user: 'framework',
            password: 'framework',
            database: 'framework'
        };
    public static SocketIO = true;


    public static KEY = "teste";
    public static TOKEN_EXPIRATION_MINUTES = 5;

    public static VIEWAPI = true;
    public static LIMITPAGE = 10;

    public static SMTP = process.env.PRODUCTION ?
        {
            host: '',
            port: 587,
            secure: false,
            auth: {
                user: '',
                pass: ''
            }
        } : {
            host: 'smtp.mailgun.org',
            port: 587,
            secure: false,
            auth: {
                user: 'postmaster@elvisdeveloper.com',
                pass: '7758442483c94ebe59fe7ee80794738f'
            }
        };

}