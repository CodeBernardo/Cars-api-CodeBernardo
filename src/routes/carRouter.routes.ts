import { Router } from "express";
import { container } from "tsyringe";
import CarServices from "../services/car.services";
import CarController from "../controllers/car.controller";
import ensure from "../middlewares/ensure.middleware";
import { createCarSchema, updateCarSchema } from "../schemas/car.schema";

const carRouter = Router();

container.registerSingleton("CarServices", CarServices);
const carController = container.resolve(CarController);

carRouter.use("/:id", ensure.validCarId);

carRouter.post("", ensure.validBody(createCarSchema), carController.create);

carRouter.get("", carController.read);

carRouter.get("/:id", carController.retrieve);

carRouter.patch(
  "/:id",
  ensure.validBody(updateCarSchema),
  carController.update,
);

carRouter.delete("/:id", carController.delete);

export default carRouter;
