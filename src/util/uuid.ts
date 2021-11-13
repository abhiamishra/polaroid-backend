import { v4 } from "uuid";
import crypto from "crypto";

// unique psuedorandom id for primary keys
// guessable, not secure
export function uuid() {
    const id = v4();
    let parsedId = "";
    // removes the dashes from the uuid
    for (const c of id) {
        if (c !== "-") {
            parsedId += c;
        }
    }
    return parsedId;
}

// not guessable, secure
export function secureId() {
    return crypto.randomBytes(128).toString("hex");
}