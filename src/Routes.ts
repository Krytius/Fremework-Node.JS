import { RouterHelper, Route } from "./helpers";
import { Middleware } from "./middleware";

import { TestController } from "./controller/Test";
import { LoginController } from "./controller/Login";


export class Routes {

    /**
     * API V1
     */
    private static v1() {
        let prefix = '/v1';

        let routes: Array<Route> = [
            {
                method: 'POST',
                path: `/Login`,
                controller: new LoginController().post
            },
            {
                path: `/test`,
                middleware: Middleware.auth,
                controller: TestController
            },
        ];

        return RouterHelper.setRoutes(routes, prefix);
    }

    /**
     * Retorna todas as rotas
     */
    public static routes() {
        let v0 = [];
        let v1 = this.v1();

        let apis = v0.concat(v1);
        return apis;
    }

}
