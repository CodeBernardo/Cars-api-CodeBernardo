import { z } from "zod";
import { userSchema } from "./user.schema";

const carSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullish(),
  brand: z.string(),
  year: z.number().int().positive(),
  km: z.number().int().positive(),
  userId: z.string()
});

const createCarSchema = carSchema.omit({ id: true });
const updateCarSchema = createCarSchema.partial();

const returnCarSchema = z.union([carSchema.array(), carSchema]);

export { carSchema, createCarSchema, updateCarSchema, returnCarSchema };
