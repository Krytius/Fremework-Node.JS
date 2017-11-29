import * as express from 'express';
import * as bodyParser from 'body-parser';
import { RequestHandler } from 'express';
import { Routes } from './Routes';
import * as cors from "cors";
import { Postback } from './middleware/Postback';
import { Config } from './Config';
import { RouterHelper } from './helpers/RouterHelper';

const options: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "*",
    preflightContinue: false
};

class Main {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.postback();
    }

    /**
     * Middlewares da api
     */
    private middleware(): void {
        this.express.use(cors(options));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    /**
     * Regra de endpoints da API
     */
    private routes(): void {
        let router = express.Router();
        let routes: any = Routes.routes();
        RouterHelper.mapRoutes(routes, router);
        this.express.use('/' + Config.URL_API_PREFIX, router);
    }

    /**
     * Tratamentos de erros
     */
    private postback() {
        this.express.use(Postback.error);
    }

}

export default new Main().express;