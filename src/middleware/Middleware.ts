import { Request, Response, NextFunction } from "express";

export class Middleware {

    /**
     * Auth basic
     * @param req 
     * @param res 
     * @param next 
     */
    public static auth(req: Request, res: Response, next: NextFunction) {

        var auth = req.get("authorization");

        if (!auth) {
            res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
            return res.status(401).send("Authorization Required");
        } else {
            var credentials = new Buffer(auth.split(" ").pop(), "base64").toString("ascii").split(":");
            
            // Implementar usuario e senha
            if (credentials[0] === "username" && credentials[1] === "password") {
                next();
            } else {
                return res.status(403).send("Access Denied (incorrect credentials)");
            }

        } 
    }

}