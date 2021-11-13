import { Request, Response } from "express";

const COOKIE_USER_ID = "COOKIE_USER_ID"

export function getUserId(req: Request) {
    // gets the user id from the cookie
    return req.cookies[COOKIE_USER_ID];
}

const cookie = (req: Request, res: Response) => {
    const cookie = getUserId(req);
    if (cookie) {

    } else {
        res.cookie(COOKIE_USER_ID, cookie, { maxAge: 900000, httpOnly: true });
    }
}

export default cookie;