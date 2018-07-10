import { DBConnection, TypeConnection } from ".";

export class Config {

    /**
     * Diretório projeto
     */
    public static DIR = __dirname;

    /**
     * URL BASE
     */
    public static BASE_URL = "http://localhost:3000";

    /**
     * Modo debug (console.log())
     */
    public static DEBUG = true;

    /**
     * Projeto em produção
     */
    public static PRODUCTION = false;

    /**
     * Porta de execuçãodo projeto
     */
    public static PORT = 3000;

    /**
     * Prefixo da API
     */
    public static URL_API_PREFIX = 'api';

    /**
     * Configuração do Banco de Dados
     * DatabaseType: driver
     *  => MYSQL: mysql
     * 
     * Connection: Conexão
     */
    public static DatabaseType = 'mysql';
    
    /**
     * Multiplas Conexões mas sem balanceamento
     * TYPE: TypeConnection.ALL     = INSERT UPDATE DELETE SELECT
     *                      WRITE   = INSERT UPDATE DELETE
     *                      READ    = SELECT
     */
    public static Connection: Array<DBConnection> = [
        {
            host: '127.0.0.1',
            user: 'eliana',
            password: 'eliana',
            database: 'ecommerce_eliana',
            type: TypeConnection.ALL
        }
    ];

    /**
     * Socket ON
     */
    public static SocketIO = false;

    /**
     * Token da Criptografia
     */
    public static KEY = "loteria";

    /**
     * Tempo de expiração do token da API
     */
    public static TOKEN_EXPIRATION_MINUTES = 5;

    /**
     * Console descreve rotas do sistema
     */
    public static VIEWAPI = true;

    /**
     * Para definir a paginação geral do sistema
     */
    public static LIMITPAGE = 10;

    /**
     * Configuração do SMTP de e-mail
     */
    public static SMTP = {
        host: 'smtp.mailgun.org',
        port: 587,
        secure: false,
        auth: {
            user: 'postmaster@elvisdeveloper.com',
            pass: '7758442483c94ebe59fe7ee80794738f'
        }
    };

    /**
     * Cache e configuração do redis
     */
    public static CACHE = true;
    public static REDIS = {
        host: '127.0.0.1',
        port: 6379,
        password: '100193'
    }


}