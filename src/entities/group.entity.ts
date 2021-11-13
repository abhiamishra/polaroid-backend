import { Entity, PrimaryKey } from "mikro-orm";

@Entity()
class Group {
    @PrimaryKey({ type: String })
    id!: string;
}

export default Group;