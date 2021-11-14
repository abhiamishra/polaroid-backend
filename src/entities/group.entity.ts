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

    //start day
    @Property({ type: Date })
    startDay: Date = new Date();

    //numdays
    @Property({ type: Number })
    numDays: Number = 7;

}



export default Group;