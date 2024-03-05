import "reflect-metadata";
import { injectable } from "tsyringe";

@injectable()
class UserService {
  create = () => {};
  login = () => {};
  profile = () => {};
}

export default UserService;
