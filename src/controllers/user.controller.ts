import { inject, injectable } from "tsyringe";
import UserService from "../services/user.services";
import { Request, Response } from "express";

@injectable()
class UserController {
  constructor(@inject("UserService") private userService: UserService) {}

  create = async (req: Request, res: Response): Promise<Response> => {
    const newUser = await this.userService.create(req.body);
    return res.status(201).json(newUser);
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    const accessToken = await this.userService.login(req.body);
    return res.status(200).json(accessToken);
  };

  profile = async (req: Request, res: Response): Promise<Response> => {
    const authorization = req.headers.authorization as string;
    const [_bearer, token] = authorization.split(" ");
    const profile = await this.userService.retrieve(token);

    return res.status(200).json(profile);
  };
}

export default UserController;
