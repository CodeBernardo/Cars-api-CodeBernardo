import { getRounds } from "bcryptjs";
import prisma from "../../../database/database";
import UserService from "../../../services/user.services";
import { createUserServiceMock } from "../../__mocks__/user.mocks";

describe("Unit Tests: Create User Service", () => {
  beforeEach(async () => await prisma.user.deleteMany());
  afterAll(async () => await prisma.user.deleteMany());

  const createUser = new UserService().create;

  test("Should be able to create user successfully", async () => {
    const { body, expectedValue } = createUserServiceMock;
    const received = await createUser(body);

    expect(received).toBeDefined();
    expect(received).toStrictEqual(expectedValue);
  });

  test("Should be able to hash user password", async () => {
    const { body } = createUserServiceMock;
    const received = await createUser(body)
    const user = await prisma.user.findUnique({where: {id: received.id}})
    const hasRound = getRounds(user!.password)

    expect(hasRound).toBeTruthy()
    expect(hasRound).toEqual(10)
  });
});
