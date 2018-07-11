import { Config } from './Config';
import { Route, RouterHelper } from '.';

import { LoginController } from './controller';


export class Routes {

    /**
     * API V1
     */
    private static v1() {
        let prefix =  `/${Config.URL_API_PREFIX}/v1`;

        let routes: Array<Route> = [
            {
                method: 'POST',
                path: `/login`,
                controller: new LoginController().post
            }
        ];

        return RouterHelper.setRoutes(routes, prefix);
    }

    private static panel() {
        let prefix = '';

        let routes: Array<Route> = [];

        return RouterHelper.setRoutes(routes, prefix);
    }

    /**
	 * All routes
     */
    public static routes() {
        let v0 = [];
        let panel = this.panel();
        let v1 = this.v1();

        let apis = v0
            .concat(v1)
            .concat(panel);
        return apis;
    }

}
