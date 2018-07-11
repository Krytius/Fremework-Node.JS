import { Response } from "express";
import { Config } from "../../Config";

export class TemplateHelper {

    /**
	 * Template render
     * @param res Response param
     * @param template file path in pages/template
     * @param page pages render
     * @param data object page
     */
    public static render(res: Response, template: string, page: string, data: any) {
        res.render(`pages/template/${template}`, { data: data, page: page, BASE_URL: Config.BASE_URL });
    }


}