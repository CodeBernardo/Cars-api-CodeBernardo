import { NextFunction, Request, Response } from "express";
import AppError from "../errors/appError";
import { verify } from "jsonwebtoken";

class AuthenticationMiddleware {
  isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    const { authorization } = req.headers;

    if (!authorization) throw new AppError(401, "Token is required");

    const [_bearer, token] = authorization.split(" ");

    res.locals = {
      ...res.locals,
      jwt_decoded: verify(token, process.env.SECRET_KEY!),
    };
    
    return next();
  };
}

export const auth = new AuthenticationMiddleware();
