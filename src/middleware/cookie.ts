import { NextFunction } from "express";
import { Request, Response } from "../types/express";
import { getOrm } from "../database";
import User from "../entities/user.entity";
import UserCreds from "../entities/userCred.entity";

const COOKIE_USER_ID = "COOKIE_USER_ID"

export function getToken(req: Request) {
    // gets the user id from the cookie
    return req.cookies[COOKIE_USER_ID] as string | undefined;
}

const cookie = async (req: Request, res: Response, next: NextFunction) => {
    const orm = await getOrm();
    
    const token = getToken(req);
    // console.log(token);
    if (token) {
        const userCreds = await orm.em.findOne(UserCreds, { token: token });

        if (userCreds) {
            req.user = userCreds.user;
            next();
        } else {
            res.status(401).json({ err: "Authentication error. Id is invalid." });
        }  
    } else {
        // console.log("no token")

        const userCreds = new UserCreds();
        const user = new User();
        userCreds.user = user;

        orm.em.persist(userCreds);
        orm.em.persist(user);

        await orm.em.flush();

        req.user = user;
        res.cookie(COOKIE_USER_ID, userCreds.token, { maxAge: 2147483647, httpOnly: true });

        next();
    }
}

export default cookie;