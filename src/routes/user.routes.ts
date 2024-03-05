import { Router } from "express";
import { container } from "tsyringe";
import CarServices from "../services/car.services";
import UserController from "../controllers/user.controller";

const userRouter = Router();
container.registerSingleton("CarServices", CarServices);
const userController = container.resolve(UserController)

userRouter.post("", userController.create)
userRouter.post("/login", userController.login);
userRouter.get("", userController.profile);

export default userRouter;
