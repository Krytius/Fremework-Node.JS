import { DBConnection } from ".";
import { EnvHelper } from "./helpers";

export class Config {

    /**
     * Diretório projeto
     */
	public static DIR = __dirname;

    /**
     * URL BASE
     */
	public static BASE_URL: string = EnvHelper.env('BASE_URL');

    /**
     * Modo debug (console.log())
     */
	public static DEBUG: boolean = EnvHelper.bool(EnvHelper.env('DEBUG'));

    /**
     * Projeto em produção
     */
	public static PRODUCTION: boolean = EnvHelper.bool(EnvHelper.env('PRODUCTION'));

    /**
     * Porta de execuçãodo projeto
     */
	public static PORT: number = Number(EnvHelper.env('PORT'));

    /**
     * Prefixo da API
     */
	public static URL_API_PREFIX: string = EnvHelper.env('URL_API_PREFIX');

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
	public static Connection: Array<DBConnection> = EnvHelper.envDB();

    /**
     * Socket ON
     */
	public static SOCKETIO: boolean = EnvHelper.bool(EnvHelper.env('SOCKETIO'));

    /**
     * Token da Criptografia
     */
	public static KEY: string = EnvHelper.env('KEY');

    /**
     * Tempo de expiração do token da API
     */
	public static TOKEN_EXPIRATION_MINUTES: number = Number(EnvHelper.env('TOKEN_EXPIRATION_MINUTES'));

    /**
     * Console descreve rotas do sistema
     */
	public static VIEWAPI: boolean = EnvHelper.bool(EnvHelper.env('VIEWAPI'));

    /**
     * Para definir a paginação geral do sistema
     */
	public static LIMITPAGE: number = +EnvHelper.env('LIMITPAGE');

    /**
     * Configuração do SMTP de e-mail
     */
	public static SMTP = {
		host: EnvHelper.env('SMTP_HOST'),
		port: EnvHelper.env('SMTP_PORT'),
		secure: EnvHelper.bool(EnvHelper.env('SMTP_SECURE')),
		auth: {
			user: EnvHelper.env('SMTP_USER'),
			pass: EnvHelper.env('SMTP_PASS')
		}
	};

    /**
     * Cache e configuração do redis
     */
	public static CACHE = EnvHelper.bool(EnvHelper.env('CACHE'));
	public static REDIS = {
		host: EnvHelper.env('REDIS_HOST'),
		port: Number(EnvHelper.env('REDIS_PORT')),
		password: EnvHelper.env('REDIS_PASSWORD')
	}


}