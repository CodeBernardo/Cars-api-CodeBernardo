import prisma from "../../../database/database";
import CarServices from "../../../services/car.services";
import {
  UpdateCarServiceMock,
  createCarServiceMock,
} from "../../__mocks__/car.mock";
import { createValidUserId } from "../../__mocks__/user.mocks";

describe("Unit Test: Update Car Service", () => {
  const updateCarService = new CarServices().update;
  const { body: newCar } = createCarServiceMock;

  beforeEach(async () => {
    await prisma.car.deleteMany();
    await prisma.user.deleteMany();
  });
  afterAll(async () => {
    await prisma.car.deleteMany();
    await prisma.user.deleteMany();
  });

  test("should be able to update a car succesfully", async () => {
    const userId = await createValidUserId();
    const { id } = await prisma.car.create({ data: { ...newCar, userId } });
    const { body, expectedValue } = UpdateCarServiceMock;
    const received = await updateCarService(id, body);

    expect(received).toStrictEqual(expectedValue);
  });
});
