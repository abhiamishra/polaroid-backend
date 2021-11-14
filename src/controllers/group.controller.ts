import { Request, Response } from "../types/express"
import Task from "../entities/task.entity"
import { getOrm } from "../database";
import Group from "../entities/group.entity";
import e from "express";
import { GroupOperator } from "mikro-orm";

const createGroup = async (req: Request, res: Response) => {
    const newGroup = new Group();

    const orm = await getOrm();

    orm.em.persist(newGroup);
    orm.em.flush();

    res.status(200).json({ "status": true, "result": 'Creating a group: successful!' })
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
    const orm = await getOrm();

    const group = await orm.em.findOne(Group, { id: req.params.id });

    if(group){
        res.status(200).json({group})
    }
    else{
        res.status(500).json({ "status": false})
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
    }

    orm.em.flush();
    res.status(200).json({ "status": true})
}

const controller = {
    createGroup,
    updateNo,
    updateYes,
    updateUnvote,
    getGroup,
    deleteGroup
}

export { controller }