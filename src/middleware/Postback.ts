import { Request, Response, NextFunction } from "express";
import { Config } from "../Config";

export class Postback {

    /**
     * Tratamento de erros da api
     * @param err 
     * @param req 
     * @param res 
     * @param next 
     */
    public static error(err: any, req: Request, res: Response, next: NextFunction) {
        let error = {
            error: true,
            message: err.message,
            code: err.code
        };

        if (Config.DEBUG) {
            console.log(error);
        }

        res.status(500).json(error);
    }


}