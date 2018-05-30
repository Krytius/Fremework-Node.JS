import { Request, Response, NextFunction } from "express";
import { OutError } from "../helpers/interfaces/OutError";
import { TokenHelper } from "../helpers/helper/TokenHelper";

export class Middleware {

    /**
     * Auth basic
     * @param req 
     * @param res 
     * @param next 
     */
    public static auth(req: Request, res: Response, next: NextFunction) {
        
        var auth = req.get("Authorization");

        let error: OutError = {
            code: 403,
            message: "Access Denied (incorrect credentials)"
        };

        if (!auth) {
            return res.status(401).send(error);
        } else {
            var credentials = auth.split(" ");

            if (credentials[0] === "Bearer") {
                TokenHelper.validate(credentials[1]).then(idUser => {
                    next();
                }).catch(error => {
                    next(error);
                });
            } else {
                return res.status(403).send(error);
            }

        }
    }

}