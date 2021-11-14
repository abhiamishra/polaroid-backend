import * as express from "express";
import { controller } from "./controllers/group.controller";
import { controller_c } from "./controllers/placedTask.controller";
import { controller_a } from "./controllers/task.controller";
import { controller_b } from "./controllers/user.controller";

console.log("in api")

const apiRouter = express.Router();

apiRouter.get("/group", controller.getGroup);
apiRouter.post("/group", controller.createGroup);
apiRouter.put("/group/voteNo", controller.updateNo);
apiRouter.put("/group/voteYes", controller.updateYes);
apiRouter.put("/group/unvote", controller.updateUnvote);
apiRouter.delete("/group", controller.deleteGroup);

apiRouter.get("/task", controller_a.getTask);
apiRouter.post("/task", controller_a.createTask);
apiRouter.put("/task/voteNo", controller_a.updateNo);
apiRouter.put("/task/voteYes", controller_a.updateYes);
apiRouter.put("/task/updateTask", controller_a.updateTask);
apiRouter.put("/task/unvote", controller_a.updateUnvote);
apiRouter.delete("/task", controller_a.deleteTask);

apiRouter.get("/placedTask", controller_c.getPlaceTasks);
apiRouter.post("/placedTask", controller_c.createPT);
apiRouter.put("/placedTask", controller_c.update_PT);
apiRouter.delete("/placedTask", controller_c.deletePlacedTask)

apiRouter.get("/user", controller_b.getUser);
apiRouter.post("/user", controller_b.createUser);
apiRouter.put("/user", controller_b.updateUser);
apiRouter.delete("/user", controller_b.deleteUser)

console.log("going out")
export { apiRouter }