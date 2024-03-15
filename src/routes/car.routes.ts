import { Router } from "express";
import { container } from "tsyringe";
import CarServices from "../services/car.services";
import CarController from "../controllers/car.controller";
import ensure from "../middlewares/ensure.middleware";
import { createCarSchema, updateCarSchema } from "../schemas/car.schema";
import { auth } from "../middlewares/auth.middleware";

const carRouter = Router();

container.registerSingleton("CarServices", CarServices);
const carController = container.resolve(CarController);

carRouter.post(
  "",
  auth.isAuthenticated,
  ensure.validBody(createCarSchema.omit({ userId: true })),
  (req, res) => carController.create(req, res),
);

carRouter.get("", (req, res) => carController.read(req, res));

carRouter.get("/:id", ensure.validCarId, (req, res) =>
  carController.retrieve(req, res),
);

carRouter.use(
  "/:id",
  auth.isAuthenticated,
  ensure.validCarId,
  ensure.carOwnership,
);

carRouter.patch("/:id", ensure.validBody(updateCarSchema), (req, res) =>
  carController.update(req, res),
);

carRouter.delete("/:id", (req, res) => carController.delete(req, res));

export default carRouter;
