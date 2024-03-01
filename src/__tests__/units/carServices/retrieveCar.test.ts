import prisma from "../../../database/database";
import CarServices from "../../../services/car.services";
import { createCarServiceMock } from "../../__mocks__/units/carMocks/car.mock";

describe("Unit Test: Retrieve Car Service.", () => {
  const retrieveCar = new CarServices().retrieve;
  const { body } = createCarServiceMock;

  beforeEach(async () => await prisma.car.deleteMany());
  afterAll(async () => await prisma.car.deleteMany());

  test("Should be able to get car by id correctly.", async () => {
    const car = await prisma.car.create({ data: body });
    const received = await retrieveCar(car.id);

    expect(received).toBeDefined();
    expect(received).toStrictEqual(car);
  });
});
