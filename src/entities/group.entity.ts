import { Entity, PrimaryKey } from "mikro-orm";
import { uuid } from "../util/id";

@Entity()
class Group {
    @PrimaryKey({ type: String })
    id: string = uuid();
}

export default Group;