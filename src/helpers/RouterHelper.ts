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
    public static mapRoutes(routes, router) {
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
                            router.get(obj.path, middleware, obj.controller);
                            break;
                        case `DELETE`:
                            router.delete(obj.path, middleware, obj.controller);
                            break;
                        case `PUT`:
                            router.put(obj.path, middleware, obj.controller);
                            break;
                        case `POST`:
                            router.post(obj.path, middleware, obj.controller);
                            break;
                    }
                    continue;
                }
            } else {
                var controller = new obj.controller();
                
                if (typeof (controller.post) == `function`)
                    router.post(obj.path, middleware, controller.post);

                if (typeof (controller.get) == `function`)
                    router.get(obj.path, middleware, controller.get);

                if (typeof (controller.getOne) == `function`)
                    router.get(`${obj.path}/:id`, middleware, controller.getOne);

                if (typeof (controller.put) == `function`)
                    router.put(`${obj.path}/:id`, middleware, controller.put);

                if (typeof (controller.delete) == `function`)
                    router.delete(`${obj.path}/:id`, middleware, controller.delete);
            }
        }

        return router;
    }

}