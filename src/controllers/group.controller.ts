import { Request, Response } from "../types/express"
import Task from "../entities/task.entity"
import { getOrm } from "../database";
import Group from "../entities/group.entity";

interface CreateGroup {
    description: string;
    location: string;
}

const createGroup = async (req: Request<CreateGroup>, res: Response) => {
    const newGroup = new Group();

    const orm = await getOrm();

    orm.em.persist(newGroup);
    orm.em.flush();
    res.status(200).json({ "status": true, "result": 'Creating a group: successful!' })
}

interface UpdateGroupYes {
    id: string;
    group_yes_votes: string[];
}

const updateYes = async (req: Request<UpdateGroupYes>, res: Response) => {
    const orm = await getOrm();

    const group = await orm.em.findOne(Group, { id: req.body.id });

    if (group) {
        if (req.body.group_yes_votes) {
            var OrigString:string[] = group.yesGroupVotes;
            var toFind = req.body.group_yes_votes[0];
            if(!OrigString.includes(toFind)){
                OrigString.push(toFind);
            }
        }
    }

    orm.em.flush();
    res.status(200).json({ "status": true, "result": 'Updating group yes votes: successful!' })
}

interface UpdateNoVotes {
    id: string;
    group_no_votes: string[];
}

const updateNo = async (req: Request<UpdateNoVotes>, res: Response) => {
    const orm = await getOrm();

    const group = await orm.em.findOne(Group, { id: req.body.id });

    if (group) {
        if (req.body.group_no_votes) {
            var OrigString:string[] = group.noGroupVotes;
            var toFind = req.body.group_no_votes[0];
            if(!OrigString.includes(toFind)){
                OrigString.push(toFind);
            }
        }
    }

    orm.em.flush();
    res.status(200).json({ "status": true, "result": 'Updating group no votes: successful!' })
}

interface ReturnId {
    id: string;
}

const getGroupById = async (req: Request<ReturnId>, res: Response) => {
    const orm = await getOrm();

    const group = await orm.em.findOne(Group, { id: req.body.id });

    if(group){
        res.status(200).json({group})
    }
    else{
        res.status(500).json({ "status": false, "result": 'Fetching group: bad!' })
    }
}

const controller = {
    createGroup,
    updateNo,
    updateYes,
    getGroupById
}

export { controller }