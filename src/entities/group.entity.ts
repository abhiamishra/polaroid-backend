import { Entity, PrimaryKey } from "mikro-orm";
import { uuid } from "../util/uuid";

@Entity()
class Group {
    @PrimaryKey({ type: String })
    id: string = uuid();
}

export default Group;