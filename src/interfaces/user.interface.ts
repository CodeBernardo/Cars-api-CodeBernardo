import { z } from "zod";
import {
  userCreateSchema,
  userReturnSchema,
  userSchema,
  userUpdateSchema,
} from "../schemas/user.schema";

type User = z.infer<typeof userSchema>;
type UserCreare = z.infer<typeof userCreateSchema>;
type UserUpdate = z.infer<typeof userUpdateSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;

export type { User, UserCreare, UserUpdate, UserReturn };
