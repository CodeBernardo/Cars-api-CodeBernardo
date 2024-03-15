import { NextFunction, Request, Response } from "express";
import prisma from "../database/database";
import AppError from "../errors/appError";
import { AnyZodObject, ZodSchema } from "zod";

class EnsureMiddleware {
  validCarId = async (
    req: Request,
    _: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.params;

    const carFound = await prisma.car.findUnique({ where: { id } });

    if (!carFound) {
      throw new AppError(404, "Car not found.");
    }
    return next();
  };

  validBody = (schema: AnyZodObject) => {
    return async (
      req: Request,
      _: Response,
      next: NextFunction,
    ): Promise<void> => {
      req.body = schema.parse(req.body);
      return next();
    };
  };

  emailIsUnique = async (
    req: Request,
    _: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { email } = req.body;
    const emailUnique = await prisma.user.findUnique({ where: { email } });

    if (emailUnique) throw new AppError(409, "Email already registered");

    return next();
  };

  carOwnership = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { sub: userId } = res.locals.jwt_decoded;

    const carOwner = await prisma.car.findUnique({
      where: { id: req.params.id },
    });

    if (userId !== carOwner?.userId)
      throw new AppError(401, "User is not the car owner");

    return next();
  };
}

const ensure = new EnsureMiddleware();
export default ensure;
