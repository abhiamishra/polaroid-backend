import { NextFunction } from "express";
import { Request, Response } from "../types/express";
import { getOrm } from "../database";
import User from "../entities/user.entity";
import UserCreds from "../entities/userCred.entity";

const COOKIE_USER_ID = "COOKIE_USER_ID"

export function getToken(req: Request) {
    // gets the user id from the cookie
    return req.cookies[COOKIE_USER_ID] as string;
}

const cookie = async (req: Request, res: Response, next: NextFunction) => {
    const orm = await getOrm();

    const token = getToken(req);
    if (token) {
        const userCreds = await orm.em.findOne(UserCreds, { token: token });

        if (userCreds) {
            req.user = userCreds.user;
            next();
        } else {
            res.status(401).json({ err: "Authentication error. Id is invalid." });
        }  
    } else {
        try {
            const userCreds = new UserCreds();
            const user = new User();
            userCreds.user = user;
    
            orm.em.persist(userCreds);
            orm.em.persist(user);
    
            await orm.em.commit();
    
            req.user = user;
            res.cookie(COOKIE_USER_ID, userCreds.token, { maxAge: 2147483647, httpOnly: true });

            next();
        } catch (err) {
            await orm.em.rollback();

            res.status(500).json({ err: "Unexpected authentication error occured" });
        }
    }
}

export default cookie;