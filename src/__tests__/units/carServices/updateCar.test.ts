import prisma from "../../../database/database";
import CarServices from "../../../services/car.services";
import {
  UpdateCarServiceMock,
  createCarServiceMock,
} from "../../__mocks__/car.mock";

describe("Unit Test: Update Car Service", () => {
  const updateCarService = new CarServices().update;
  const { body: data } = createCarServiceMock;

  beforeEach(async () => await prisma.car.deleteMany());
  afterAll(async () => await prisma.car.deleteMany());

  test("should be able to update a car succesfully", async () => {
    const { id } = await prisma.car.create({ data });
    const { body, expectedValue } = UpdateCarServiceMock;
    const received = await updateCarService(id, body);

    expect(received).toStrictEqual(expectedValue);
  });
});
