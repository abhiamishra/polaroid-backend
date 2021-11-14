import { Cascade, OneToOne } from "@mikro-orm/core";
import { ArrayType, Entity, ManyToOne, PrimaryKey, Property } from "mikro-orm";
import { MAX_DESC_LEN, MAX_NAME_LEN } from "../globals";
import { uuid } from "../util/id";
import Group from "./group.entity";
import Task from "./task.entity";

@Entity() 
class PlacedTask {
        @PrimaryKey({ type: String })
        id: string = uuid(); //

        @ManyToOne({ entity: () => Task, cascade: [Cascade.REMOVE] })
        task!: Task;

        @ManyToOne({ entity: () => Group })
        group!: Group;
        
        @Property({ type: Number })
        duration!: Number;

        @Property({ type: Number })
        startTime!: Number;

        @Property({ type: Number })
        startDay!: Number;
}

export default PlacedTask;

