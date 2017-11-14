import { Router, Request, Response } from "express";

export interface Controller {
    post(req: Request, res: Response)
    get(req: Request, res: Response)
    getOne(req: Request, res: Response)
    put(req: Request, res: Response)
    delete(req: Request, res: Response)
}