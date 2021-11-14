import { Request, Response } from "../types/express"
import Task from "../entities/task.entity"
import { getOrm } from "../database";
import { json } from "express";
import Group from "../entities/group.entity";
import PlacedTask from "../entities/placedTask.entity";

interface createplacedTask {
    taskId: string;
    duration: number;
    startTime: number;
    startDay: number;
}

const createPT = async (req: Request<createplacedTask>, res: Response) => {
    const orm = await getOrm();
    const placed_task = new PlacedTask();

    console.log("in create pt", req.body)

    const task = await orm.em.findOne(Task, { id: req.body.taskId});
    console.log(task);
    if(task){
        placed_task.task = task;
        placed_task.group = task.group;
    }
    else{
        var newTask = new Task();
        placed_task.task = newTask;
    }
    
    if(placed_task){
        placed_task.duration = req.body.duration;
        placed_task.startTime = req.body.startTime;
        placed_task.startDay = req.body.startDay;
    }

    console.log(placed_task);
    
    orm.em.persist(placed_task);
    orm.em.flush();

    res.status(200).json(placed_task)
}

interface updatePT {
    ptId: string;
    duration: number;
    startTime: number;
    startDay: number;
}

const update_PT = async (req: Request<updatePT>, res: Response) => {
    const orm = await getOrm();
    const placed_task = await orm.em.findOne(PlacedTask, { id: req.body.ptId });

    if (placed_task) {
        if (req.body.duration) {
            placed_task.duration = req.body.duration;
        }
        if (req.body.startTime) {
            placed_task.startTime = req.body.startTime;
        }
        if (req.body.startDay) {
            placed_task.startDay = req.body.startDay;
        }
    }
    
    orm.em.flush();
    res.status(200).json({"status": true})
}

interface ReturnId {
    id: string;
}

const getPlaceTasks = async (req: Request<{}, ReturnId>, res: Response) => {
    const orm = await getOrm();

    console.log("here", req.query.id)
    const placed_tasks = await orm.em.find(PlacedTask, { group: req.query.id }, ["task"]);
    console.log(placed_tasks);

    if(placed_tasks){
        res.status(200).json(placed_tasks);
    }
    else{
        res.status(404).json({ "status": false})
    }
}

interface DeleteId {
    deleteId: string;
}

const deletePlacedTask = async (req: Request<DeleteId>, res: Response) => {
    const orm = await getOrm();

    const pt = await orm.em.findOne(PlacedTask, { id: req.body.deleteId });

    if(pt){
        orm.em.remove(pt);
    }
    else{
        res.status(500).json({ "status": false})
    }

    orm.em.flush();
    res.status(200).json({ "status": true})
}

export const controller_c = {
    deletePlacedTask,
    getPlaceTasks,
    update_PT,
    createPT
}