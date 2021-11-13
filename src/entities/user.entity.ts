import { Entity, PrimaryKey, Property } from "mikro-orm";
import { MAX_NAME_LEN } from "../globals";
import { secureId, uuid } from "../util/uuid";

@Entity()
class User {
    @PrimaryKey({ type: String })
    id: string = uuid();

    @Property({ type: String, length: MAX_NAME_LEN })
    name!: string;
}

export default User;