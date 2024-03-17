import prisma from "../../../database/database";
import CarServices from "../../../services/car.services";
import { createCarServiceMock } from "../../__mocks__/car.mock";
import { createValidUserId } from "../../__mocks__/user.mocks";

describe("Unit Test: Retrieve Car Service.", () => {
  const retrieveCar = new CarServices().retrieve;
  const { body } = createCarServiceMock;

  beforeEach(async () => {
    await prisma.car.deleteMany();
    await prisma.user.deleteMany();
  });
  afterAll(async () => {
    await prisma.car.deleteMany();
    await prisma.user.deleteMany();
  });

  test("Should be able to get car by id correctly.", async () => {
    const userId = await createValidUserId()
    const car = await prisma.car.create({ data:{...body, userId }});
    const received = await retrieveCar(car.id);

    expect(received).toBeDefined();
    expect(received).toStrictEqual(car);
  });
});
