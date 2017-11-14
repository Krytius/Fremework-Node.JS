import { Middleware } from "./middleware/Middleware";

import { TestController } from "./controller/Test";


export class Routes {
    public static routes() {
        return [
            {
                method: `GET`,
                path: `/test/:id`,
                controller: new TestController().getOne,
                middleware: Middleware.start
            },
            {
                path: `/test`,
                controller: TestController
            }
        ];
    }

}
