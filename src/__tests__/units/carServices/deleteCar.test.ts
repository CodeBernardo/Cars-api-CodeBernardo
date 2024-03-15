import prisma from "../../../database/database";
import CarServices from "../../../services/car.services";
import { createCarServiceMock } from "../../__mocks__/car.mock";
import { createValidUserId } from "../../__mocks__/user.mocks";

describe("Unit Test: Delete Car Service", () => {
  const deleteCarService = new CarServices().delete;
  const { body } = createCarServiceMock;

  beforeEach(async () => {
    await prisma.car.deleteMany();
    await prisma.user.deleteMany();
  });
  afterAll(async () => {
    await prisma.car.deleteMany();
    await prisma.user.deleteMany();
  });

  test("should be able to delete a car succesfully", async () => {
    const userId = await createValidUserId();
    const { id } = await prisma.car.create({data: {...body, userId}})
    await deleteCarService(id);
    const carDeleted = await prisma.car.findUnique({ where: { id } });

    expect(carDeleted).toBeNull();
  });
});
