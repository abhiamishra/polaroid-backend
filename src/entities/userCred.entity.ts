import { Entity, OneToOne, PrimaryKey, Property } from "mikro-orm";
import { MAX_NAME_LEN } from "../globals";
import { secureId, uuid } from "../util/id";
import User from "./user.entity";

@Entity()
class UserCreds {
    // used to check if I am this user or not
    // ONLY THE ACTUAL USER SHOULD BE ABLE TO SEE THIS!!!
    @PrimaryKey({ type: String})
    token: string = secureId().substring(0,200);

    @OneToOne({ entity: () => User })
    user!: User;
}

export default UserCreds;