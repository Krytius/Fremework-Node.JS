import { Router, Request, Response, NextFunction } from "express";

export interface Controller {
    post(req: Request, res: Response, next: NextFunction)
    get(req: Request, res: Response, next: NextFunction)
    getOne(req: Request, res: Response, next: NextFunction)
    put(req: Request, res: Response, next: NextFunction)
    delete(req: Request, res: Response, next: NextFunction)
    view(req: Request, res: Response, next: NextFunction)
    viewDetail(req: Request, res: Response, next: NextFunction)
}