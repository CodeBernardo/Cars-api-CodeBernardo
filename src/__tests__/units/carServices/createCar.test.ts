import prisma from "../../../database/database";
import CarServices from "../../../services/car.services";
import {
  createCarServiceMock,
  createCarServiceMock2,
} from "../../__mocks__/car.mock";
import { createValidUserId } from "../../__mocks__/user.mocks";

describe("Unit test: Create Car service", () => {
  const createCarService = new CarServices().create;

  beforeEach(async () => {
    await prisma.car.deleteMany();
    await prisma.user.deleteMany();
  });
  afterAll(async () => {
    await prisma.car.deleteMany();
    await prisma.user.deleteMany();
  });

  test("Should be able to create a car.", async () => {
    const userId = await createValidUserId();
    const { body, expectedValue } = createCarServiceMock;
    const received = await createCarService({ ...body, userId: userId });

    expect(received).toStrictEqual(expectedValue);
  });

  test("Should be able to create a car whithoud description.", async () => {
    const userId = await createValidUserId();

    const { body, expectedValue } = createCarServiceMock2;
    const received = await createCarService({ ...body, userId: userId });

    expect(received).toStrictEqual(expectedValue);
  });
});
