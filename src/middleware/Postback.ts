import { Response, NextFunction } from "express";
import { Config } from "../Config";
import { OutError, IRequest } from "..";

export class Postback {

    /**
     * Tratamento de erros da api
     * @param err 
     * @param req 
     * @param res 
     * @param next 
     */
    public error(err: OutError, req: IRequest, res: Response, next: NextFunction) {

        if(err.code == 403) {
            res.status(err.code).json(err);
            return;
        }

        if (err.code != 0) {
            let error: OutError = {
                error: true,
                message: err.message,
                code: err.code,
                data: {}
            };

            if (Config.DEBUG) {
                console.log(error);
            }

            res.status(500).json(error);
        } else {
            res.status(200).json(err);
        }
    }


}