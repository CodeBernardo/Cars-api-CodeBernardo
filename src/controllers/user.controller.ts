import { inject, injectable } from "tsyringe";
import UserService from "../services/user.services";

@injectable()
class UserController {
  constructor(@inject("CarServices") private userService: UserService) {}
  
  create = () => {};
  login = () => {};
  profile = () => {};
}

export default UserController;
