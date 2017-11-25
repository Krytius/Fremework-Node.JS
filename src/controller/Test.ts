import { Router, Request, Response } from "express";
import { Database, WhereModel } from "../database/Database";
import { Controller } from "../helpers/interfaces/Controller";

export class TestController implements Controller {

    public post(req: Request, res: Response) {
        let db = new Database();

        var item = {
            id: req.body.id
        };


        // Start transaction
        db.startTransaction();

        // Insert example
        db.insert(`Usuario`, item)
            .then(result => {
                console.log(result);

                db.commit();

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
        let db = new Database();
        db.getRow(`Usuario`, req.params.id)
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