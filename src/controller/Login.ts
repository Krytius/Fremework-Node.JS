import { Response, NextFunction } from "express";
import { IRequest, Database, WhereModel, OutError, CryptHelper, TokenHelper } from "..";

export class LoginController {

    // POST /Login
    public post(req: IRequest, res: Response, next: NextFunction) {
        let self = new LoginController();
        let auth = req.body;
        let db = new Database(next.bind(this));
        let where: WhereModel[] = [
            { col: `email`, value: auth.email },
        ];

        db.get(`User`, [`id`, `name`, `email`, `password`], where)
            .then(result => self.response(result, auth.pass, next, res));
    }

    private response(result, password: string, next: NextFunction, res) {
        let resp: OutError = {
            code: 0,
            message: "Autenticado com sucesso.",
            error: false,
            data: {}
        }

        if (result.length == 0) {
            resp.message = "Usuário e senha inválidos.";
            next(resp);
            return;
        }

        if(CryptHelper.decrypt(result[0].password) != password) {
            resp.message = "Usuário e senha inválidos.";
            next(resp);
            return;
        }

        resp.token = TokenHelper.create(result[0].id);
        res.json(resp);
    }

}