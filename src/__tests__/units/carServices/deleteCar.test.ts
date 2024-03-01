import prisma from "../../../database/database";
import CarServices from "../../../services/car.services";
import { createCarServiceMock } from "../../__mocks__/units/carMocks/car.mock";

describe("Unit Test: Delete Car Service", () => {
  const deleteCarService = new CarServices().delete;
  const { body: data } = createCarServiceMock;

  beforeEach(async () => await prisma.car.deleteMany());
  afterAll(async () => await prisma.car.deleteMany());

  test("should be able to delete a car succesfully", async () => {
    const { id } = await prisma.car.create({ data });
    await deleteCarService(id);
    const carDeleted = await prisma.car.findUnique({ where: { id } });

    expect(carDeleted).toBeNull()
  });
});
