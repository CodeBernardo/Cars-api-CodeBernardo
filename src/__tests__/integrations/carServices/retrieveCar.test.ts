import prisma from "../../../database/database";
import { createCarServiceMock } from "../../__mocks__/car.mock";
import request from "../../utils/request";

describe("Integration Test: Retrieve Car Service", () => {
  beforeEach(async () => await prisma.car.deleteMany());
  afterAll(async () => await prisma.car.deleteMany());

  test("Should be able to retrieve a car successfully", async () => {
    const { body, expectedValue } = createCarServiceMock;
    const { id } = await prisma.car.create({ data: body });

    const received = await request
      .get(`/cars/${id}`)
      .expect(200)
      .then((res) => res.body);

    expect(received).toBeDefined();
    expect(received).toStrictEqual(expectedValue);
  });

  test("Should throw an error if car id is invalid", async () => {
    const received = await request
      .get("/cars/invalidId")
      .expect(404)
      .then((res) => res.body);

    expect(received).toStrictEqual({ message: "Car not found." });
  });
});
