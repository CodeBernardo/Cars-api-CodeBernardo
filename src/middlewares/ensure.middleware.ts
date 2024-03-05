import { NextFunction, Request, Response } from "express";
import prisma from "../database/database";
import AppError from "../errors/appError";
import { AnyZodObject } from "zod";

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
}

const ensure = new EnsureMiddleware();
export default ensure;
