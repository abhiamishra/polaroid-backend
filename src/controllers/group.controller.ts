import { Request, Response } from "../types/express"
import { getOrm } from "../database";
import Group from "../entities/group.entity";

const createGroup = async (req: Request, res: Response) => {
    const newGroup = new Group();

    const orm = await getOrm();

    orm.em.persist(newGroup);
    orm.em.flush();

    res.status(200).json(newGroup);
}

interface UpdateGroup {
    id: string;
    dateId: string;
    numDays: string;
}

const updateTask = async (req: Request<UpdateGroup>, res: Response) => {
    const orm = await getOrm();

    const group = await orm.em.findOne(Group, { id: req.body.id });

    if (group) {
        if (req.body.dateId) {
            group.startDay = new Date(req.body.dateId);
        }
        if (req.body.numDays) {
            group.numDays = Number.parseInt(req.body.numDays);
        }
    }

    orm.em.flush();
    res.status(200).json({ "status": true})
}

interface UpdateGroupYes {
    id: string;
    voteYes: string;
}

const updateYes = async (req: Request<UpdateGroupYes>, res: Response) => {
    const orm = await getOrm();

    const group = await orm.em.findOne(Group, { id: req.body.id });

    var statusVote = -1;
    if (group) {
        if (req.body.voteYes) {
            var yes_OrigString:string[] = group.yesGroupVotes;
            var no_OrigString:string[] = group.noGroupVotes;
            var toFind = req.user?.id;

            if(toFind && !yes_OrigString.includes(toFind)){
                yes_OrigString.push(toFind);
                group.yesGroupVotes = yes_OrigString;
            }
            else{
                orm.em.flush();
                res.status(500).json({ "status": false})
            }
            
            if(toFind && no_OrigString.includes(toFind)){ 
                var index = no_OrigString.indexOf(toFind);
                delete no_OrigString[index];
                group.noGroupVotes = no_OrigString;
            }
        }
    }

    orm.em.flush();
    res.status(200).json({ "status": true, "result": 'Updating group yes votes: successful!' })
}

interface UpdateNoVotes {
    id: string;
    voteNo: string;
}

const updateNo = async (req: Request<UpdateNoVotes>, res: Response) => {
    const orm = await getOrm();

    const group = await orm.em.findOne(Group, { id: req.body.id });

    if (group) {
        if (req.body.voteNo) {
            var no_OrigString:string[] = group.noGroupVotes;
            var yes_OrigString:string[] = group.yesGroupVotes;

            var toFind = req.user?.id;
            if(toFind && !no_OrigString.includes(toFind)){
                no_OrigString.push(toFind);
                group.noGroupVotes = no_OrigString;
            }
            else{
                orm.em.flush();
                res.status(500).json({ "status": false})
            }

            if(toFind && yes_OrigString.includes(toFind)){ 
                var index = yes_OrigString.indexOf(toFind);
                delete yes_OrigString[index];

                group.yesGroupVotes = yes_OrigString;

            }
        }
    }

    orm.em.flush();
    res.status(200).json({ "status": true, "result": 'Updating group no votes: successful!' })
}

interface UpdateUnvote {
    id: string;
    voteUnvote: string;
}

const updateUnvote = async (req: Request<UpdateUnvote>, res: Response) => {
    const orm = await getOrm();

    const group = await orm.em.findOne(Group, { id: req.body.id });

    if (group) {
        if (req.body.voteUnvote) {
            var no_OrigString:string[] = group.noGroupVotes;
            var yes_OrigString:string[] = group.yesGroupVotes;

            var toFind = req.user?.id;
            if(toFind && yes_OrigString.includes(toFind)){
                var index = yes_OrigString.indexOf(toFind);
                delete yes_OrigString[index];

                group.yesGroupVotes = yes_OrigString;
            }
            else if(toFind && no_OrigString.includes(toFind)){
                var index = no_OrigString.indexOf(toFind);
                delete no_OrigString[index];

                group.noGroupVotes = no_OrigString;
            }
        }
    }

    orm.em.flush();
    res.status(200).json({ "status": true})
}

interface ReturnId {
    id: string;
}

const getGroup = async (req: Request<{}, ReturnId>, res: Response) => {
    console.log("hi im here")
    
    const orm = await getOrm();

    console.log("params ", req.query.id)
    const group = await orm.em.findOne(Group, { id: req.query.id });

    if(group){
        res.status(200).json(group)
    }
    else{
        res.status(400).json({ "status": false})
    }
}


interface DeleteId {
    deleteId: string;
}

const deleteGroup = async (req: Request<DeleteId>, res: Response) => {
    const orm = await getOrm();

    const group = await orm.em.findOne(Group, { id: req.body.deleteId });

    if(group){
        orm.em.remove(group);
    }
    else{
        res.status(500).json({ "status": false})
        return
    }

    orm.em.flush();
    res.status(200).json({ "status": true})
}

const controller = {
    createGroup,
    updateTask,
    updateNo,
    updateYes,
    updateUnvote,
    getGroup,
    deleteGroup
}

export { controller }