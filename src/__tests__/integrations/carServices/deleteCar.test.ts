import prisma from "../../../database/database";
import { createCarServiceMock } from "../../__mocks__/car.mock";
import request from "../../utils/request";

describe("Integration Test: Delete Car Service", () => {
  beforeEach(async () => await prisma.car.deleteMany());
  afterAll(async () => await prisma.car.deleteMany());

  test("Should be able to delete car successfully", async () => {
    const { id } = await prisma.car.create({ data: createCarServiceMock.body });

    await request.delete(`/cars/${id}`).expect(204);
    const carDeleted = await prisma.car.findUnique({ where: { id } });

    expect(carDeleted).toBeNull();
  });

  test("Should throw an error if car id is invalid", async () => {
    const received = await request
      .delete("/cars/invalidId")
      .expect(404)
      .then((res) => res.body);

    expect(received).toStrictEqual({ message: "Car not found." });
  });
});
