import * as redis from "redis";
import { Config } from "../../Config";

export class CacheRedis {
	public static client: redis.RedisClient;
}

export class CacheHelper {

	private field: string;

	/**
	 * Create field cache
	 * @param field field parent
	 */
	constructor(field) {
		this.field = field;
	}

	/**
	 * Verify open connection cache and start connection
	 */
	private validate() {
		if (!Config.CACHE) {
			throw "Cache desabilitado.";
		}

		if (!CacheRedis.client.connected) {
			throw "Problema na conexão.";
		}

		return true;
	}

	/**
	 * Add item for cache
	 * @param key key for cache
	 * @param value value for cache
	 */
	public set(key: string, value: any) {
		return new Promise((resolve) => {
			try {
				this.validate();
				CacheRedis.client.hset(this.field, key, JSON.stringify(value), (resp) => {
					resolve(resp);
				});
			} catch (e) {
				resolve(false);
			}
		});
	}

	/**
	 * Recuvery item for cache
	 * @param key key for cache
	 */
	public get(key) {
		return new Promise((resolve) => {
			try {
				this.validate();
				CacheRedis.client.hget(this.field, key, (err, resp) => {
					if (err) {
						resolve(false);
					}
					resolve(JSON.parse(resp));
				});
			} catch (e) {
				resolve(false);
			}
		});
	}

	/**
	 * Remove key for cache
	 * @param key key
	 */
	public remove(key) {
		return new Promise((resolve) => {
			try {
				this.validate();
				CacheRedis.client.hdel(this.field, key, (resp) => {
					resolve(resp);
				});
			} catch (e) {
				resolve(false);
			}
		});
	}

	/**
	 * Remove all itens field for cache
	 */
	public clear() {
		return new Promise((resolve) => {
			try {
				this.validate();
				CacheRedis.client.del(this.field, (resp) => {
					resolve(resp);
				});
			} catch (e) {
				resolve(false);
			}
		});
	}
}