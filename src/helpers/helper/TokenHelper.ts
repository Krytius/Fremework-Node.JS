import { Config } from "../../Config";
import { CryptHelper } from "./CryptHelper";
import { Database } from "../../database/Database";
import { OutError } from "../interfaces/OutError";

export class TokenHelper {


    /**
     * Criação do token
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
            timeout: date.getTime()
        });

        return crypt;
    }

    /**
     * Validação do token
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
                        error.message = `Token não existe.`
                        reject(error);
                        return;
                    }

                    let date = new Date();
                    if (resp[0].timeout < date.getTime()) {
                        error.message = `Token expirado.`
                        db.delete(`Token`, [{ col: `token`, value: token }]);
                        reject(error);
                        return;
                    }

                    date.setMinutes(date.getMinutes() + Config.TOKEN_EXPIRATION_MINUTES);
                    db.update(`Token`, {
                        timeout: date.getTime()
                    }, [{ col: `token`, value: token }]);
                    resolve(resp[0].idUser);
                });

        });

    }

    public static getUser(req) {
        var auth = req.get("authorization");
        var credentials = auth.split(" ");
        return new Promise((resolve, reject) => {
            let db = new Database();
            db.get(`Token`, [`idUser`, `timeout`], [{ col: `token`, value: credentials[1] }])
                .then(resp => {
                    db.get(`User`, [`id`, `name`, `email`, `IdProfile`], [
                        { col: `id`, value: resp[0].idUser }
                    ]).then(r => {
                        resolve(r[0]);
                    });
                });
        });
    }


}