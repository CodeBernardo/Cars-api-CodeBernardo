import { NextFunction, Request, Response } from "express";
import AppError from "../errors/appError";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";


class HandleErrorsMiddleware {
  static execute = (
    err: Error,
    _: Request,
    res: Response,
    __: NextFunction,
  ): Response => {
    if (err instanceof AppError) {
      return res.status(err.status_code).json({ message: err.message });
    }

    if (err instanceof ZodError) {
      return res.status(400).json({ message: err.errors });
    }

    if (err instanceof JsonWebTokenError) {
      return res.status(401).json({ message: err.message });
    }

    console.log(err);
    return res.status(500).json({ message: "Internal Server Error." });
  };
}

const handleErrors = HandleErrorsMiddleware.execute;

export default handleErrors ;
