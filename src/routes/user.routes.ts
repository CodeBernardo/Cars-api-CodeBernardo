import { Router } from "express";
import { container } from "tsyringe";
import UserController from "../controllers/user.controller";
import UserService from "../services/user.services";
import ensure from "../middlewares/ensure.middleware";
import { userCreateSchema, userLoginSchema } from "../schemas/user.schema";
import { auth } from "../middlewares/auth.middleware";

const userRouter = Router();
container.registerSingleton("UserService", UserService);
const userController = container.resolve(UserController);

userRouter.post(
  "",
  ensure.validBody(userCreateSchema),
  ensure.emailIsUnique,
  (req, res) => userController.create(req, res),
);
userRouter.post("/login", ensure.validBody(userLoginSchema), (req, res) =>
  userController.login(req, res),
);
userRouter.get("", auth.isAuthenticated, (req, res) =>
  userController.profile(req, res),
);

export default userRouter;
