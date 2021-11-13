import { ArrayType, Entity, ManyToOne, PrimaryKey, Property } from "mikro-orm";
import { MAX_DESC_LEN, MAX_NAME_LEN } from "../globals";
import { uuid } from "../util/uuid";
import Group from "./group.entity";

@Entity()
class Task {
    @PrimaryKey({ type: String })
    id: string = uuid();

    @ManyToOne({ entity: () => Group })
    group!: Group;
    
    @Property({ type: String, length: MAX_NAME_LEN })
    name!: string;

    @Property({ type: String, length: MAX_DESC_LEN })
    description!: string;

    @Property({ type: ArrayType })
    yesVotes: string[] = [];

    @Property({ type: ArrayType })
    noVotes: string[] = [];
}

export default Task;