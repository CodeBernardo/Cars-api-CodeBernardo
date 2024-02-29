import { z } from "zod";
import {
  carSchema,
  createCarSchema,
  updateCarSchema,
} from "../schemas/car.schema";

type Car = z.infer<typeof carSchema>;
type CreateCar = z.infer<typeof createCarSchema>;
type UpdateCar = z.infer<typeof updateCarSchema>;

export type { Car, CreateCar, UpdateCar };
