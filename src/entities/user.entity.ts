import { Entity, PrimaryKey, Property } from "mikro-orm";
import { MAX_NAME_LEN } from "../globals";

@Entity()
class User {
    @PrimaryKey({ type: String })
    id!: string;

    @Property({ type: String, length: MAX_NAME_LEN })
    name!: string;
}

export default User;