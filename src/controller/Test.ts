import { Router, Request, Response } from "express";
import { Database, WhereModel, InsertModel } from "../database/Database";
import { Controller } from "../helpers/Controller";

export class TestController implements Controller {
    
    public post(req: Request, res: Response) {
        var item = Object.assign(new Array<InsertModel>(), [{ col: `id`, value: req.body.id }]);
        
        Database.insert(`Usuario`, item).then(function(result) {
            res.json(result);
        });
        
    }

    public get(req: Request, res: Response) {
        console.log("Controller All")
        res.json({
            message: `GET`
        });
    }

    public getOne(req: Request, res: Response) {
        Database
            .get(`Usuario`, [`id`])
            .then(function (result) {
                res.json(result);
            });
    }

    public put(req: Request, res: Response) {
        res.json({
            message: `PUT`
        });
    }

    public delete(req: Request, res: Response) {
        res.json({
            message: `DELETE`
        });
    }
    
}