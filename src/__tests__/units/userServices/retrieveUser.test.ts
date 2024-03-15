import { sign } from "jsonwebtoken";
import prisma from "../../../database/database";
import UserService from "../../../services/user.services";
import { createUserServiceMock } from "../../__mocks__/user.mocks";

describe("Unit Tests: Retrieve User Service", () => {
  beforeEach(async () => await prisma.user.deleteMany());
  afterAll(async () => await prisma.user.deleteMany());

  const retrieveUser = new UserService().retrieve;

  test("Should be able to get user profile", async () => {
    const { body, expectedValue } = createUserServiceMock;
    const { id } = await prisma.user.create({ data: body });
    const jwt = sign({}, process.env.SECRET_KEY!, { subject: id });
    const received = await retrieveUser(jwt)

    expect(received).toBeDefined()
    expect(received).toStrictEqual(expectedValue)
  });
});
