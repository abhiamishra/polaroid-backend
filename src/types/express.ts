import { Request as ExpressRequest, Response as ExpressResponse } from "express";
import User from "../entities/user.entity";

export interface Request<T = {}> extends ExpressRequest<{}, {}, T> {
    user?: User;
}

export type Response = ExpressResponse;