import { Response, NextFunction } from "express";
import { worker } from "cluster";
import { IRequest, OutError, Database, Controller } from "..";



export class TestController implements Controller {

    // POST /test
    public post(req: IRequest, res: Response, next: NextFunction) {

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
    public get(req: IRequest, res: Response, next: NextFunction) {
        let error: OutError = {
            code: 0,
            message: `OK`,
            data: {}
        };

        next(error);
    }

    // GET /test/:id
    public getOne(req: IRequest, res: Response, next: NextFunction) {
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
    public put(req: IRequest, res: Response, next: NextFunction) {
        res.json({
            message: `PUT`
        });
    }

    // DELETE /test/:id
    public delete(req: IRequest, res: Response, next: NextFunction) {
        res.json({
            message: `DELETE`
        });
    }

    // VIEW /test/view
    public view(req: IRequest, res: Response, next: NextFunction) {
        res.render(`pages/index`, {});
    }

    // VIEW /test/view/:id
    public viewDetail(req: IRequest, res: Response, next: NextFunction) {
        let db = new Database(next);
        db.get(`User`)
            .then((result) => {
                res.render(`pages/index`, {
                    users: result
                });
            });
    }

}