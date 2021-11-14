import { ArrayType, Entity, PrimaryKey, Property } from "mikro-orm";
import { uuid } from "../util/id";

@Entity()
class Group {
    @PrimaryKey({ type: String })
    id: string = uuid();

    @Property({ type: ArrayType })
    yesGroupVotes: string[] = [];

    @Property({ type: ArrayType })
    noGroupVotes: string[] = [];
}



export default Group;