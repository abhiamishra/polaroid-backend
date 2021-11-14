import { Request, Response } from "../types/express"
import Task from "../entities/task.entity"
import { getOrm } from "../database";
import Group from "../entities/group.entity";
import User from "../entities/user.entity";

interface CreateUser {
    name: string;
}

const createUser = async (req: Request<CreateUser>, res: Response) => {
    const newUser = new User();

    if(req.body.name){
        newUser.name = req.body.name;

        const orm = await getOrm();

        orm.em.persist(newUser);
        orm.em.flush();
    
        res.status(200).json({ "status": true})
    }

}

interface UpdateUser {
    name: string;
}

const updateUser = async (req: Request<UpdateUser>, res: Response) => {
    const orm = await getOrm();

    const user = await orm.em.findOne(User, { id: req.user?.id });

    if (user) {
        if (req.body.name) {
            user.name = req.body.name;   
        }
    }

    orm.em.flush();

    res.status(200).json({ "status": true})
}

const getUser = async (req: Request, res: Response) => {
    const orm = await getOrm();

    const user = await orm.em.findOne(User, { id: req.user?.id });

    if(user){
        res.status(200).json({user})
    }
    else{
        res.status(500).json({ "status": false});
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const orm = await getOrm();

    const user = await orm.em.findOne(User, { id: req.user?.id });

    if(user){
        orm.em.remove(user);
    }
    else{
        res.status(500).json({ "status": false})
    }

    orm.em.flush();
    res.status(200).json({ "status": true})
}

const controller_b = {
    createUser,
    updateUser,
    getUser,
    deleteUser
}

export { controller_b }