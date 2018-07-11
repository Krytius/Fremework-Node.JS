import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as formidable from 'express-formidable';
import * as cors from "cors";
import * as expressListRoutes from 'express-list-routes';
import { Routes } from './Routes';
import { Config } from './Config';
import { RouterHelper, Postback } from '.';

const options: cors.CorsOptions = {
	allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
	credentials: true,
	methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
	origin: "*",
	preflightContinue: false
};

class Main {

	public express: express.Application;

	constructor() {
		this.express = express();
		this.views();
		this.routes();
		this.postback();
	}

	private views() {
		this.express.set('view engine', 'ejs');
	}

    /**
     * Regra de endpoints da API
     */
	private routes(): void {
		this.express.use(`/upload`, express.static(path.join(`${Config.DIR}`, '../storage')));
		this.express.use(`/css`, express.static(path.join(`${Config.DIR}`, '../public/css')));
		this.express.use(`/js`, express.static(path.join(`${Config.DIR}`, '../public/js')));
		this.express.use(`/images`, express.static(path.join(`${Config.DIR}`, '../public/images')));
		this.express.use(`/admin`, express.static(path.join(`${Config.DIR}`, '../frontend')));

		this.middleware();
		let router = express.Router();
		let routes: any = Routes.routes();
		router = RouterHelper.mapRoutes(routes, router);
		this.express.use(router);

		if (Config.VIEWAPI) {
			expressListRoutes({}, 'API:', router);
		}
	}

    /**
     * Middlewares da api
     */
	private middleware(): void {
		this.express.use(cors(options));
		this.express.use(formidable());
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: false }));
	}

    /**
     * Tratamentos de erros
     */
	private postback() {
		this.express.use(new Postback().error);
	}

}

export default new Main().express;