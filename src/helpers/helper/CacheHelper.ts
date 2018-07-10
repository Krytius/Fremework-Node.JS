import * as redis from "redis";
import { Config } from "../../Config";

export class CacheRedis {
    public static client: redis.RedisClient;
}

export class CacheHelper {

    private field: string;

    constructor(field) {
        this.field = field;
    }

    private validate() {
        if (!Config.CACHE) {
            throw "Cache desabilitado.";
        }

        if (!CacheRedis.client.connected) {
            throw "Problema na conexão.";
        }

        return true;
    }

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

    public clearAll() {
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