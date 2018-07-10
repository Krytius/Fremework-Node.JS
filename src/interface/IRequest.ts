import { Request } from "express";

export interface IRequest extends Request {
    idUser?: number;
    user?: any;
}