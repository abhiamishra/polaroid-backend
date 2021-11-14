import { Request as ExpressRequest, Response as ExpressResponse } from "express";
import User from "../entities/user.entity";

export interface Request<Body = {}, Query = {}> extends ExpressRequest<{}, {}, Body, Query> {  
       user?: User; 
}


export type Response = ExpressResponse;