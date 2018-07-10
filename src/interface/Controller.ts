import { Response, NextFunction } from "express";
import { IRequest } from ".";

export interface Controller {
    post(req: IRequest, res?: Response, next?: NextFunction)
    get(req: IRequest, res?: Response, next?: NextFunction)
    getOne(req: IRequest, res?: Response, next?: NextFunction)
    put(req: IRequest, res?: Response, next?: NextFunction)
    delete(req: IRequest, res?: Response, next?: NextFunction)
    view?(req: IRequest, res?: Response, next?: NextFunction)
    viewDetail?(req: IRequest, res?: Response, next?: NextFunction)
}