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

    newUser.name = req.body.name;

    const orm = await getOrm();

    orm.em.persist(newUser);
    orm.em.flush();

    res.status(200).json({ "status": true, "result": 'Creating a user: successful!' })

}

interface UpdateUser {
    user_id: string;
    name: string;
}

const updateUser = async (req: Request<UpdateUser>, res: Response) => {
    const orm = await getOrm();

    const user = await orm.em.findOne(User, { id: req.body.user_id });

    if (user) {
        if (req.body.name) {
            user.name = req.body.name;   
        }
    }

    orm.em.flush();

    res.status(200).json({ "status": true, "result": 'Updating a user: successful!' })
}

interface ReturnId {
    id: string;
}

const getUserById = async (req: Request<ReturnId>, res: Response) => {
    const orm = await getOrm();

    const user = await orm.em.findOne(User, { id: req.body.id });

    if(user){
        res.status(200).json({user})
    }
    else{
        res.status(500).json({ "status": false, "result": 'Fetching a user: bad!' })
    }
}

const controller = {
    createUser,
    updateUser,
    getUserById
}

export { controller }