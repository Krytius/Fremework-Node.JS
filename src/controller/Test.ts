import { Router, Request, Response, NextFunction } from "express";
import { Database, WhereModel } from "../database";
import { TokenHelper, Controller, OutError } from "../helpers";
import { worker } from "cluster";



export class TestController implements Controller {

    // POST /test
    public post(req: Request, res: Response, next: NextFunction) {

        var item = {
            id: req.body.id
        };

        let resp: OutError = {
            code: 0,
            message: "Execução concluída.",
            error: false,
            data: {
                worker: worker.id
            }
        }

        next(resp);
    }

    // GET /test
    public get(req: Request, res: Response, next: NextFunction) {
        let error: OutError = {
            code: 0,
            message: `OK`,
            data: {}
        };

        next(error);
    }

    // GET /test/:id
    public getOne(req: Request, res: Response, next: NextFunction) {
        let db = new Database(next);
        db.getRow(`User`, req.params.id)
            .then((result) => {

                let resp: OutError = {
                    code: 0,
                    message: "Execução concluída.",
                    error: false,
                    data: result
                }

                next(resp);
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

    // VIEW /test/view
    public view(req: Request, res: Response, next: NextFunction) {
        let db = new Database(next);
        db.get(`User`)
            .then((result) => {
                res.render(`pages/index`, {
                    users: result
                });
            });
    }

    // VIEW /test/view/:id
    public viewDetail(req: Request, res: Response, next: NextFunction) {
        let db = new Database(next);
        db.get(`User`)
            .then((result) => {
                res.render(`pages/index`, {
                    users: result
                });
            });
    }

}