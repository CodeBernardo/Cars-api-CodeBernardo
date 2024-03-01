import prisma from "../../../database/database";
import CarServices from "../../../services/car.services";
import {
  createCarServiceMock,
  createCarServiceMock2,
} from "../../__mocks__/units/carMocks/car.mock";

describe("Unit test: Create Car service", () => {
  const createCarService = new CarServices().create;

  beforeAll(async () => await prisma.car.deleteMany());
  afterAll(async () => await prisma.car.deleteMany());

  test("Should be able to create a car.", async () => {
    const { body, expectedValue } = createCarServiceMock;
    const received = await createCarService(body);

    expect(received).toStrictEqual(expectedValue);
  });

  test("Should be able to create a car whithoud description.", async () => {
    const { body, expectedValue } = createCarServiceMock2;
    const received = await createCarService(body);

    expect(received).toStrictEqual(expectedValue);
  });
});
