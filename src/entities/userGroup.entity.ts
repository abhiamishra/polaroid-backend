import { Entity, ManyToOne } from "mikro-orm";
import Group from "./group.entity";
import User from "./user.entity";

@Entity()
class UserGroup {
    @ManyToOne({ entity: () => User })
    user!: User;

    @ManyToOne({ entity: () => Group })
    group!: Group;
}

export default UserGroup;