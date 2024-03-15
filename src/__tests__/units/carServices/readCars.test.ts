import prisma from "../../../database/database";
import CarServices from "../../../services/car.services";
import { createCarServiceMock } from "../../__mocks__/car.mock";
import { createValidUserId } from "../../__mocks__/user.mocks";

describe("Unit Test: Read Car Service", () => {
  const carServiceRead = new CarServices().read;

  beforeEach(async () => {
    await prisma.car.deleteMany();
    await prisma.user.deleteMany();
  });
  afterAll(async () => {
    await prisma.car.deleteMany();
    await prisma.user.deleteMany();
  });

  
  test("Should be able to return all cars", async () => {
    const userId = await createValidUserId()
    await prisma.car.create({ data: {...createCarServiceMock.body, userId} })
    const received = await carServiceRead();
    
    expect(received).toBeDefined();
    expect(received).toHaveLength(1);
  });

    test("Should be able to return all cars of especific user", async () => {
      const userId = await createValidUserId();
      await prisma.car.create({
        data: { ...createCarServiceMock.body, userId },
      });
      const received = await carServiceRead(userId);

      expect(received).toBeDefined();
      expect(received).toHaveLength(1);
      expect(received).toStrictEqual([createCarServiceMock.expectedValue])
    });
});
