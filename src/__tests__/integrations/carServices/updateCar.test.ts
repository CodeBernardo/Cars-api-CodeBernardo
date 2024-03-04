import prisma from "../../../database/database";
import {
  UpdateCarServiceMock,
  UpdateCarinvalidBodyMock,
  createCarServiceMock,
} from "../../__mocks__/car.mock";
import request from "../../utils/request";

describe("Integration Test: Update Car Service", () => {
  beforeEach(async () => await prisma.car.deleteMany());
  afterAll(async () => await prisma.car.deleteMany());

  test("Should be able to update car succsessfully", async () => {
    const { id } = await prisma.car.create({ data: createCarServiceMock.body });
    const { body, expectedValue } = UpdateCarServiceMock;

    const received = await request
      .patch(`/cars/${id}`)
      .send(body)
      .expect(200)
      .then((res) => res.body);

    expect(received).toStrictEqual(expectedValue);
  });

  test("Should throw an error if invalid body params", async () => {
    const { id } = await prisma.car.create({ data: createCarServiceMock.body });
    const { body, expectedValue } = UpdateCarinvalidBodyMock;

    const received = await request
      .patch(`/cars/${id}`)
      .send(body)
      .expect(400)
      .then((res) => res.body);

    expect(received).toStrictEqual(expectedValue);
  });

  test("Should throw an error if invalid car id", async () => {
    const received = await request
      .patch("/cars/invalidId")
      .expect(404)
      .then((res) => res.body);

    expect(received).toStrictEqual({ message: "Car not found." });
  });
});
