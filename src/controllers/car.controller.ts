import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import CarServices from "../services/car.services";

@injectable()
class CarController {
  constructor(@inject("CarServices") private carServices: CarServices) {}

  create = async (req: Request, res: Response): Promise<Response> => {
    const newCar = await this.carServices.create({
      ...req.body,
      userId: res.locals.jwt_decoded.sub,
    });
    return res.status(201).json(newCar);
  };

  read = async (req: Request, res: Response): Promise<Response> => {
    const carList = await this.carServices.read(req.query.id as string);
    return res.status(200).json(carList);
  };

  retrieve = async (req: Request, res: Response): Promise<Response> => {
    const carFound = await this.carServices.retrieve(req.params.id as string);
    return res.status(200).json(carFound);
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const carId = req.params.id;
    const carUpdated = await this.carServices.update(carId, req.body);
    return res.status(200).json(carUpdated);
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    await this.carServices.delete(req.params.id);
    return res.sendStatus(204);
  };
}

export default CarController;
