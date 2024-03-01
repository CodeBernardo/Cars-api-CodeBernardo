import prisma from "../../../database/database";
import CarServices from "../../../services/car.services";
import { createCarServiceMock } from "../../__mocks__/units/carMocks/car.mock";

describe("Unit Test: Read Car Service", () => {
  const carServiceRead = new CarServices().read;

  beforeEach(async () => {
    await prisma.$transaction([
      prisma.car.create({ data: createCarServiceMock.body }),
      prisma.car.create({ data: createCarServiceMock.body }),
    ]);
  });
  
  afterEach(async () => await prisma.car.deleteMany());

  test("Should be able to return all cars", async () => {
    const received = await carServiceRead();
    expect(received).toHaveLength(2);
  });
});
