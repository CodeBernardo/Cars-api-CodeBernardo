import { z } from "zod";
import {
  loginReturnSchema,
  userCreateSchema,
  userLoginSchema,
  userReturnSchema,
  userSchema,
} from "../schemas/user.schema";

type User = z.infer<typeof userSchema>;
type UserCreate = z.infer<typeof userCreateSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;
type UserLogin = z.infer<typeof userLoginSchema>;
type UserLoginReturn = z.infer<typeof loginReturnSchema>;

export type { User, UserCreate, UserReturn, UserLogin, UserLoginReturn };
