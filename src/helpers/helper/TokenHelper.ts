import { Config } from "../../Config";
import { CryptHelper, DateHelper, CacheHelper } from "..";
import { Database, OutError } from "../..";
import { userInfo } from "os";

export class TokenHelper {


    /**
     * Create token
     * @param idUser 
     */
	public static create(idUser) {
		let date = new Date();
		date.setMinutes(date.getMinutes() + Config.TOKEN_EXPIRATION_MINUTES);

		let crypt = CryptHelper.encrypt(`${date.getTime()}-${idUser}`);

		let db = new Database();
		db.insert(`Token`, {
			token: crypt,
			idUser: idUser,
			timeout: Config.TOKEN_EXPIRATION_MINUTES * 60
		});

		return crypt;
	}

    /**
     * Validate token
     * @param token 
     */
	public static validate(token) {
		return new Promise((resolve, reject) => {
			let db = new Database();
			db.get(`Token`, [`idUser`, `timeout`], [{ col: `token`, value: token }])
				.then(resp => {

					let error: OutError = {
						code: 10,
						message: `Token válido`
					}

					if (resp.length == 0) {
						error.message = `Tempo de uso expirado.`
						error.code = 403;
						reject(error);
						return;
					}

					db.update(`Token`, {
						date: DateHelper.convert(new Date().getTime())
					}, [{ col: `token`, value: token }]);
					resolve(resp[0].idUser);
				});

		});

	}

	/**
	 * Get user by id
	 * @param idUser 
	 */
	public static getUser(idUser) {
		return new Promise((resolve, reject) => {
			var cache = new CacheHelper('User');
			var user = cache.get(`User:${idUser}`);
			if (user) {
				resolve(user);
			}

			let db = new Database();
			db.get(`User`, [`id`, `name`, `email`, `IdProfile`], [
				{ col: `id`, value: idUser }
			]).then(r => {
				cache.set(`User:${idUser}`, r[0]);
				resolve(r[0]);
			});
		});
	}


}