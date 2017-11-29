import { RouterHelper } from "./helpers/RouterHelper";
import { Middleware } from "./middleware/Middleware";

import { TestController } from "./controller/Test";


export class Routes {

    /**
     * API V1
     */
    private static v1() {
        let prefix = '/v1';
        let routes = [
            {
                path: `/test`,
                controller: TestController
            }
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
