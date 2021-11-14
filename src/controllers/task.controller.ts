import { Request, Response } from "../types/express"
import Task from "../entities/task.entity"
import { getOrm } from "../database";
import { json } from "express";

interface CreateTask {
    name: string;
    groupId: string;
    description: string;
    location: string;
    link: string;
}

const createTask = async (req: Request<CreateTask>, res: Response) => {
    const newTask = new Task();

    newTask.name = req.body.name;
    newTask.description = req.body.name;
    newTask.location = req.body.location;
    newTask.link = req.body.link;

    const orm = await getOrm();

    orm.em.persist(newTask);
    orm.em.flush();

    res.status(200).json({ "status": true, "result": 'Creation of task: successful!' })
}

interface UpdateTask {
    id: string;
    update: {
        description?: string;
        name?: string;
        location?: string;
        link?:  string;
    }
}

const updateTask = async (req: Request<UpdateTask>, res: Response) => {
    const orm = await getOrm();

    const task = await orm.em.findOne(Task, { id: req.body.id });

    if (task) {
        if (req.body.update.name) {
            task.name = req.body.update.name;
        }
        if (req.body.update.description) {
            task.description = req.body.update.description;
        }
        if (req.body.update.location) {
            task.location = req.body.update.location;
        }
        if (req.body.update.link) {
            task.link = req.body.update.link;
        }
    }

    orm.em.flush();
    res.status(200).json({ "status": true, "result": 'Updating of task: successful!' })

}

interface UpdateYesVotes {
    id: string;
    yesVotes: string[];
}

const updateYes = async (req: Request<UpdateYesVotes>, res: Response) => {
    const orm = await getOrm();

    const task = await orm.em.findOne(Task, { id: req.body.id });

    if (task) {
        if (req.body.yesVotes) {
            var yesOrigString:string[] = task.yesVotes;
            var toFind = req.body.yesVotes[0];
            if(!yesOrigString.includes(toFind)){
                yesOrigString.push(toFind);
            }
        }
    }

    orm.em.flush();
    res.status(200).json({ "status": true, "result": 'Updating yes votes: successful!' })

}

interface UpdateNoVotes {
    id: string;
    noVotes: string[];
}

const updateNo = async (req: Request<UpdateNoVotes>, res: Response) => {
    const orm = await getOrm();

    const task = await orm.em.findOne(Task, { id: req.body.id });

    if (task) {
        if (req.body.noVotes) {
            var noOrigString:string[] = task.yesVotes;
            var toFind = req.body.noVotes[0];
            if(!noOrigString.includes(toFind)){
                noOrigString.push(toFind);
            }
        }
    }

    orm.em.flush();
    res.status(200).json({ "status": true, "result": 'Updating no votes: successful!' })

}

interface ReturnId {
    id: string;
}

const getTaskById = async (req: Request<ReturnId>, res: Response) => {
    const orm = await getOrm();

    const task = await orm.em.findOne(Task, { id: req.body.id });
    
    if(task){
        res.status(200).json({task});
    }
    else{
        res.status(500).json({ "status": false, "result": 'Fetching a task: bad!' })
    }
}

const controller = {
    createTask,
    updateTask,
    updateYes,
    updateNo,
    getTaskById
}

export { controller }