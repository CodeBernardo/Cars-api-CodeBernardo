import { Router } from "express";
import { container } from "tsyringe";
import CarServices from "../services/car.services";
import CarController from "../controllers/car.controller";


const carRouter = Router();
container.registerSingleton("CarServices", CarServices);
const carController = container.resolve(CarController);

carRouter.post("", carController.create);

carRouter.get("", carController.read);

carRouter.get("/:id", carController.retrieve);

carRouter.patch("/:id", carController.update);

carRouter.delete("/:id", carController.delete);

export default carRouter;
