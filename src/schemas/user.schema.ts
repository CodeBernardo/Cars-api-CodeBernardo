import { z } from "zod";
import { carSchema } from "./car.schema";

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  cars: carSchema.array().nullish()
});

const userCreateSchema = userSchema.omit({
  id: true,
  cars: true
});

const userReturnSchema = userSchema.omit({
  password: true,
});

const userLoginSchema = userCreateSchema.omit({
  name: true,
});

const loginReturnSchema = z.object({
  accessToken: z.string(),
  user: userSchema.omit({
    password: true,
    cars: true
  })
})

export {
  userSchema,
  userCreateSchema,
  userReturnSchema,
  userLoginSchema,
  loginReturnSchema
};
