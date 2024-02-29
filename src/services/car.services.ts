import { injectable } from "tsyringe";
import { CreateCar, ReturnCar, UpdateCar } from "../interfaces/car.interface";
import prisma from "../database/database";
import { returnCarSchema } from "../schemas/car.schema";

@injectable()
class CarServices {
  create = async (data: CreateCar): Promise<ReturnCar> => {
    const newCar = await prisma.car.create({ data });
    return returnCarSchema.parseAsync(newCar);
  };

  read = async (): Promise<ReturnCar | undefined> => {
    const carList = await prisma.car.findMany();
    return returnCarSchema.parseAsync(carList);
  };

  retrieve = async (id: string): Promise<ReturnCar> => {
    const carFound = await prisma.car.findUnique({ where: { id } });
    return returnCarSchema.parseAsync(carFound);
  };

  update = async (id: string, data: UpdateCar): Promise<ReturnCar> => {
    const carUpdated = await prisma.car.update({ where: { id }, data });
    return returnCarSchema.parseAsync(carUpdated);
  };

  delete = async (id: string): Promise<void> => {
    await prisma.car.delete({ where: { id } });
  };
}

export default CarServices;
