import { Middleware } from "./middleware/Middleware";

import { TestController } from "./controller/Test";


export class Routes {
    public static routes() {
        return [
            {
                path: `/test`,
                controller: TestController
            }
        ];
    }

}
