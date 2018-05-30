export class RouterHelper {

    /**
     * Concatena prefixo a rotas
     * @param routes 
     * @param prefix 
     */
    public static setRoutes(routes, prefix) {
        let obj = [];
        for (var key in routes) {
            routes[key].path = prefix + routes[key].path;
        }
        return routes;
    }

    /**
     * Regra de endpoints da API
     * @param routes 
     * @param router 
     */
    public static mapRoutes(routes: Array<Route>, router) {
        for (var key in routes) {

            var obj = routes[key];

            var middleware = [];

            if (typeof (obj.middleware) != `undefined`) {
                middleware = obj.middleware;
            }

            if (typeof (obj.method) != `undefined`) {
                if (obj.method) {
                    switch (obj.method) {
                        case `GET`:
                            router.get(obj.path, middleware, obj.controller.bind(this));
                            break;
                        case `DELETE`:
                            router.delete(obj.path, middleware, obj.controller.bind(this));
                            break;
                        case `PUT`:
                            router.put(obj.path, middleware, obj.controller.bind(this));
                            break;
                        case `POST`:
                            router.post(obj.path, middleware, obj.controller.bind(this));
                            break;
                        case `VIEW`:
                            router.get(obj.path, middleware, obj.controller.bind(this));
                            break;
                    }
                    continue;
                }
            } else {
                var controller = new obj.controller();
                if (typeof (controller.view) == `function`) {
                    router.get(`${obj.path}/view`, middleware, controller.view.bind(this));
                    router.get(`${obj.path}/view/:id`, middleware, controller.viewDetail.bind(this));
                }

                if (typeof (controller.post) == `function`)
                    router.post(obj.path, middleware, controller.post.bind(this));

                if (typeof (controller.get) == `function`)
                    router.get(obj.path, middleware, controller.get.bind(this));

                if (typeof (controller.getOne) == `function`)
                    router.get(`${obj.path}/:id`, middleware, controller.getOne.bind(this));

                if (typeof (controller.put) == `function`)
                    router.put(`${obj.path}/:id`, middleware, controller.put.bind(this));

                if (typeof (controller.delete) == `function`)
                    router.delete(`${obj.path}/:id`, middleware, controller.delete.bind(this));
            }
        }

        return router;
    }

}

export class Route {
    public path: string;
    public middleware?: any;
    public controller: any;
    public method?: string;
}