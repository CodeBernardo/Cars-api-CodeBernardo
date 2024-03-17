import { hash } from "bcryptjs";
import prisma from "../../../database/database";
import {
  createUserServiceMock,
  userInvalidCredentials,
  userInvalidLoginServiceMock,
  userLoginServiceMock,
} from "../../__mocks__/user.mocks";
import request from "../../utils/request";

describe("Integration Tests: User Login Service", () => {
  beforeEach(async () => await prisma.user.deleteMany());
  afterAll(async () => await prisma.user.deleteMany());

  test("Should be able to login correctly", async () => {
    const hashPass = await hash(createUserServiceMock.body.password, 10);
    await prisma.user.create({
      data: { ...createUserServiceMock.body, password: hashPass },
    });

    const { body, expectedValue } = userLoginServiceMock;

    const received = await request
      .post("/users/login")
      .send(body)
      .expect(200)
      .then((res) => res.body);

    expect(received).toStrictEqual(expectedValue);
  });

  test("Should throw an error if body param is missing", async () => {
    const { body, expectedValue } = userInvalidLoginServiceMock;
    const received = await request
      .post("/users/login")
      .send(body)
      .expect(400)
      .then((res) => res.body);

    expect(received).toStrictEqual(expectedValue);
  });

  test("Should throw an error if credentials are invalid", async () => {
    const received = await request
      .post("/users/login")
      .send(userInvalidCredentials)
      .expect(401)
      .then((res) => res.body);

      expect(received).toStrictEqual({message: "Invalid credentials."})
  });
});
