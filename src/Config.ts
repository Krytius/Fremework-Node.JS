import { DBConnection } from ".";
import { EnvHelper } from "./helpers";

export class Config {

    /**
     * Path project
     */
	public static DIR = __dirname;

    /**
     * BASE URL 
     */
	public static BASE_URL: string = EnvHelper.env('BASE_URL');

    /**
     * Debug Mode (console.log())
     */
	public static DEBUG: boolean = EnvHelper.bool(EnvHelper.env('DEBUG'));

	/**
	 * Maintenance Mode
	 */
	public static MAINTENANCE: boolean = false;

    /**
     * Production
     */
	public static PRODUCTION: boolean = EnvHelper.bool(EnvHelper.env('PRODUCTION'));

    /**
     * Port execution
     */
	public static PORT: number = Number(EnvHelper.env('PORT'));

    /**
     * API prefix
     */
	public static URL_API_PREFIX: string = EnvHelper.env('URL_API_PREFIX');

    /**
     * Database configuration
     * DatabaseType: driver
     *  => MYSQL: mysql
     * 
     * Connection: Conexão
     */
	public static DatabaseType = 'mysql';

    /**
	 * Multiple connection
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
     * Token criptography
     */
	public static KEY: string = EnvHelper.env('KEY');

    /**
	 * Token expiration
     */
	public static TOKEN_EXPIRATION_MINUTES: number = Number(EnvHelper.env('TOKEN_EXPIRATION_MINUTES'));

    /**
     * Route view in console
     */
	public static VIEWAPI: boolean = EnvHelper.bool(EnvHelper.env('VIEWAPI'));

    /**
	 * Controls itens per page
     */
	public static LIMITPAGE: number = +EnvHelper.env('LIMITPAGE');

    /**
     * E-mail configuration
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
     * Redis control
     */
	public static CACHE = EnvHelper.bool(EnvHelper.env('CACHE'));
	public static REDIS = {
		host: EnvHelper.env('REDIS_HOST'),
		port: Number(EnvHelper.env('REDIS_PORT')),
		password: EnvHelper.env('REDIS_PASSWORD')
	}

}