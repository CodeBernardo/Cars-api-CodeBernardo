import { z } from "zod";
import {
  carSchema,
  createCarSchema,
  returnCarSchema,
  updateCarSchema,
} from "../schemas/car.schema";

type Car = z.infer<typeof carSchema>;
type CreateCar = z.infer<typeof createCarSchema>;
type UpdateCar = z.infer<typeof updateCarSchema>;
type ReturnCar = z.infer<typeof returnCarSchema>;

export type { Car, CreateCar, UpdateCar, ReturnCar };
