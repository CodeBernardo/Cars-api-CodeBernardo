import prisma from "../../../database/database";
import {
  createInvalidUserServiceMock,
  createUserServiceMock,
} from "../../__mocks__/user.mocks";
import request from "../../utils/request";

describe("Integration Tests: Create User Service", () => {
  beforeEach(async () => await prisma.user.deleteMany());
  afterAll(async () => await prisma.user.deleteMany());

  test("Should be able to create a user successfully.", async () => {
    const { body, expectedValue } = createUserServiceMock;
    const received = await request
      .post("/users")
      .send(body)
      .expect(201)
      .then((res) => res.body);

    expect(received).toStrictEqual(expectedValue);
    expect(received.password).toBeUndefined();
  });

  test("Should throw an error if body param is missing", async () => {
    const { body, expectedValue } = createInvalidUserServiceMock;
    const received = await request
      .post("/users")
      .send(body)
      .expect(400)
      .then((res) => res.body);

    expect(received).toStrictEqual(expectedValue);
  });

  test("Should throw an error if user email already exists", async () => {
    const { body } = createUserServiceMock;
    await prisma.user.create({ data: body });
    const received = await request
      .post("/users")
      .send(body)
      .expect(409)
      .then((res) => res.body);

      expect(received).toStrictEqual({ message: "Email already registered" });
  });
});
