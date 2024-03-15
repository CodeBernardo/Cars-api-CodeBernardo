import { hash } from "bcryptjs";
import prisma from "../../../database/database";
import UserService from "../../../services/user.services";
import {
  createUserServiceMock,
  userLoginServiceMock,
} from "../../__mocks__/user.mocks";

describe("Unit Tests: User Login Service", () => {
  beforeEach(async () => await prisma.user.deleteMany());
  afterAll(async () => await prisma.user.deleteMany());
  const userLogin = new UserService().login;

  test("Should be able to login successfully", async () => {
    const user = createUserServiceMock.body;
    const hashedPassword = await hash(user.password, 10)
    await prisma.user.create({ data: {...user, password: hashedPassword} });
    const { body, expectedValue } = userLoginServiceMock;
    const received = await userLogin(body);

    expect(received).toStrictEqual(expectedValue);
  });
});
