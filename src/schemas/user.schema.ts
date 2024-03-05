import { z } from "zod";

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const userCreateSchema = userSchema.pick({
  email: true,
  password: true,
});

const userUpdateSchema = userCreateSchema.partial();

const userReturnSchema = userSchema.omit({
  password: true,
});

export { userSchema, userCreateSchema, userUpdateSchema, userReturnSchema };
