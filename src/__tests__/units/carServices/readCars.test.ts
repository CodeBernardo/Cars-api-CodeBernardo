import prisma from "../../../database/database";
import CarServices from "../../../services/car.services";
import { createCarServiceMock } from "../../__mocks__/car.mock";

describe("Unit Test: Read Car Service", () => {
  const carServiceRead = new CarServices().read;

  beforeEach(async () => await prisma.car.deleteMany());
  afterEach(async () => await prisma.car.deleteMany());
  
  test("Should be able to return all cars", async () => {
    await prisma.car.create({ data: createCarServiceMock.body })
    const received = await carServiceRead();
    
    expect(received).toBeDefined();
    expect(received).toHaveLength(1);
  });
});
