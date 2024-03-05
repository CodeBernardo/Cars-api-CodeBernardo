import "reflect-metadata";
import { injectable } from "tsyringe";
import {
  UserCreate,
  UserLogin,
  UserLoginReturn,
  UserReturn,
} from "../interfaces/user.interface";
import prisma from "../database/database";
import { loginReturnSchema, userReturnSchema } from "../schemas/user.schema";
import { compare, hash } from "bcryptjs";
import AppError from "../errors/appError";
import { sign } from "jsonwebtoken";

@injectable()
class UserService {
  create = async (payload: UserCreate): Promise<UserReturn> => {
    const newUser = await prisma.user.create({
      data: {
        ...payload,
        password: await hash(payload.password, 10),
      },
    });

    return userReturnSchema.parseAsync(newUser);
  };

  login = async ({ email, password }: UserLogin): Promise<UserLoginReturn> => {
    const user = await prisma.user.findUnique({ where: { email } });
    const pwdMatch = await compare(password, String(user?.password));

    if (!user || !pwdMatch) throw new AppError(401, "Invalid credentials.");

    const accessToken = sign(
      {
        name: user.name,
        email: user.email,
      },
      String(process.env.SECRET_KEY!),
      {
        expiresIn: "1h",
        subject: user.id,
      },
    );

    return loginReturnSchema.parseAsync({
      accessToken,
      user,
    });
  };

  retrieve = () => {};
}

export default UserService;
