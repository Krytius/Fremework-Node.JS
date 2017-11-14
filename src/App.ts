import * as express from 'express';
import * as bodyParser from 'body-parser';
import { RequestHandler } from 'express';
import { Routes } from './Routes';


class Main {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    /**
     * Regra de endpoints da API
     */
    private routes(): void {

        let router = express.Router();

        let routes: any = Routes.routes();
        for (var key in routes) {

            var obj = routes[key];
            var middleware = function (req, res, next) {
                next();
            };

            if (typeof (obj.middleware) != `undefined`) {
                middleware = obj.middleware;
            }

            if (typeof (obj.method) != `undefined`) {
                if (obj.method) {
                    switch (obj.method) {
                        case `GET`:
                            router.get(obj.path, [middleware], obj.controller);
                            break;
                        case `DELETE`:
                            router.delete(obj.path, [middleware], obj.controller);
                            break;
                        case `PUT`:
                            router.put(obj.path, [middleware], obj.controller);
                            break;
                        case `POST`:
                            router.post(obj.path, [middleware], obj.controller);
                            break;
                    }
                    continue;
                }
            } else {
                var controller = new obj.controller();

                if (typeof (controller.post) == `function`)
                    router.post(obj.path, [middleware], controller.post);

                if (typeof (controller.get) == `function`)
                    router.get(obj.path, [middleware], controller.get);

                if (typeof (controller.getOne) == `function`)
                    router.get(`${obj.path}/:id`, [middleware], controller.getOne);

                if (typeof (controller.put) == `function`)
                    router.put(`${obj.path}/:id`, [middleware], controller.put);

                if (typeof (controller.delete) == `function`)
                    router.delete(`${obj.path}/:id`, [middleware], controller.delete);
            }
        }


        this.express.use('/', router);
    }

}

export default new Main().express;