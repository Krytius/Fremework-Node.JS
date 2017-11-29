import { Router, Request, Response } from "express";
import { Database, WhereModel } from "../database/Database";
import { Controller } from "../helpers/interfaces/Controller";
import { NextFunction } from "express-serve-static-core";
import { OutError } from "../helpers/interfaces/OutError";

export class TestController implements Controller {

    

    // POST /test
    public post(req: Request, res: Response, next: NextFunction) {
        let db = new Database(next.bind(this));

        var item = {
            id: req.body.id
        };

        // Start transaction
        db.startTransaction();

        // Insert example
        db.insert(`Usuario`, item)
            .then(result => {
                db.commit();
                res.json(result);
            });
    }

    // GET /test
    public get(req: Request, res: Response, next: NextFunction) {
        let db = new Database(next.bind(this));
        db.get(`Usuario`)
            .then(result => {
                res.json(result);
            });
    }

    // GET /test/:id
    public getOne(req: Request, res: Response, next: NextFunction) {
        let db = new Database(next);
        db.getRow(`Usuario`, req.params.id)
            .then((result) => {
                res.json(result);
            });
    }

    // PUT /test/:id
    public put(req: Request, res: Response, next: NextFunction) {
        res.json({
            message: `PUT`
        });
    }

    // DELETE /test/:id
    public delete(req: Request, res: Response, next: NextFunction) {
        res.json({
            message: `DELETE`
        });
    }

}