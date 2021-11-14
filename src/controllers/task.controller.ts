import { Request, Response } from "../types/express"
import Task from "../entities/task.entity"
import { getOrm } from "../database";
import Group from "../entities/group.entity";
import PlacedTask from "../entities/placedTask.entity";

interface CreateTask {
    name: string;
    groupId: string;
    description: string;
    location: string;
    link: string;
}

const createTask = async (req: Request<CreateTask>, res: Response) => {
    const orm = await getOrm();

    const newTask = new Task();
    newTask.name = req.body.name;

    const group = await orm.em.findOne(Group, { id: req.body.groupId });
    if(group){
        newTask.group = group;
    }
    else{
        var newGroup = new Group();
        newTask.group = newGroup;
    }
    
    newTask.description = req.body.description;
    newTask.location = req.body.location;
    newTask.link = req.body.link;

    orm.em.persist(newTask);
    orm.em.flush();

    res.status(200).json(newTask);
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
    res.status(200).json({ "status": true})

}

interface UpdateYesVote {
    id: string;
    voteYes: string;
}

const updateYes = async (req: Request<UpdateYesVote>, res: Response) => {
    const orm = await getOrm();

    const task = await orm.em.findOne(Task, { id: req.body.id });

    if (task) {
        if (req.body.voteYes) {
            var yes_OrigString:string[] = task.yesVotes;
            var no_OrigString:string[] = task.noVotes;

            var toFind = req.user?.id;
            if(toFind && !yes_OrigString.includes(toFind)){
                yes_OrigString.push(toFind);
                task.yesVotes = yes_OrigString;
            }
            else{
                orm.em.flush();
                res.status(500).json({ "status": false})
            }
            
            if(toFind && no_OrigString.includes(toFind)){ 
                var index = no_OrigString.indexOf(toFind);
                delete no_OrigString[index];
                task.noVotes = no_OrigString;
            }
        }
    }

    orm.em.flush();
    res.status(200).json({ "status": true, "result": 'Updating group yes votes: successful!' })
}

interface UpdateNoVote {
    id: string;
    voteNo: string;
}

const updateNo = async (req: Request<UpdateNoVote>, res: Response) => {
    const orm = await getOrm();

    const task = await orm.em.findOne(Task, { id: req.body.id });

    if (task) {
        if (req.body.voteNo) {
            var no_OrigString:string[] = task.noVotes;
            var yes_OrigString:string[] = task.yesVotes;

            var toFind = req.user?.id;
            if(toFind && !no_OrigString.includes(toFind)){
                no_OrigString.push(toFind);
                task.noVotes = no_OrigString;
            }
            else{
                orm.em.flush();
                res.status(500).json({ "status": false})
            }

            if(toFind && yes_OrigString.includes(toFind)){ 
                var index = yes_OrigString.indexOf(toFind);
                delete yes_OrigString[index];

                task.yesVotes = yes_OrigString;

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

    const task = await orm.em.findOne(Task, { id: req.body.id });

    if (task) {
        if (req.body.voteUnvote) {
            var no_OrigString:string[] = task.noVotes;
            var yes_OrigString:string[] = task.yesVotes;

            var toFind = req.user?.id;
            if(toFind && yes_OrigString.includes(toFind)){
                var index = yes_OrigString.indexOf(toFind);
                delete yes_OrigString[index];

                task.yesVotes = yes_OrigString;
            }
            else if(toFind && no_OrigString.includes(toFind)){
                var index = no_OrigString.indexOf(toFind);
                delete no_OrigString[index];

                task.noVotes = no_OrigString;
            }
        }
    }

    orm.em.flush();
    res.status(200).json({ "status": true})
}

interface ReturnId {
    id: string;
}

const getTasks = async (req: Request<{}, ReturnId>, res: Response) => {
    const orm = await getOrm();

    const tasks = await orm.em.find(Task, { group: req.query.id });
    
    if(tasks){
        res.status(200).json(tasks);
    }
    else{
        res.status(500).json({ "status": false})
    }
}

interface DeleteId {
    id: string;
}

// interface getAllTasks{
//     groupId: string;
// }

// const getAllTasks = async (req: Request<getAllTasks>, res: Response) => {
//     const orm = await getOrm();

//     const task = await orm.em.findOne(Task, { id: req.body.groupId });

//     var statusCode = -1;
    
//     if(task){
//         res.status(200).json({task})
//     }
//     else{
//         res.status(500).json({ "status": false});
//     }
// }

const deleteTask = async (req: Request<{}, DeleteId>, res: Response) => {
    const orm = await getOrm();

    const task = await orm.em.findOne(Task, { id: req.query.id });

    if(task){
        orm.em.remove(task);
    }
    else{
        res.status(500).json({ "status": false})
    }

    orm.em.flush();
    res.status(200).json({ "status": true})
}

const controller_a = {
    createTask,
    updateTask,
    updateYes,
    updateNo,
    updateUnvote,
    getTask: getTasks,
    deleteTask
}

export { controller_a }