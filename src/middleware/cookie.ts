import { NextFunction } from "express";
import { Request, Response } from "../types/express";
import { getOrm } from "../database";
import User from "../entities/user.entity";
import UserCreds from "../entities/userCred.entity";

const COOKIE_USER_ID = "COOKIE_USER_ID"

export function getUserId(req: Request) {
    // gets the user id from the cookie
    return req.cookies[COOKIE_USER_ID] as string;
}

const cookie = async (req: Request, res: Response, next: NextFunction) => {
    const cookie = getUserId(req);
    if (cookie) {

    } else {
        const orm = await getOrm();

        try {
            const userCreds = new UserCreds();
            const user = new User();
            userCreds.user = user;
    
            orm.em.persist(userCreds);
            orm.em.persist(user);
    
            await orm.em.commit();
    
            res.cookie(COOKIE_USER_ID, userCreds.token, { maxAge: 2147483647, httpOnly: true });

            next();
        } catch (err) {
            await orm.em.rollback();

            res.json({ err: "Unexpected authentication error occured" });
        }
    }
}

export default cookie;