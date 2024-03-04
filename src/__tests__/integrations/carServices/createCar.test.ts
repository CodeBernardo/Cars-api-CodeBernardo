import prisma from "../../../database/database";
import {
  createCarInvalidBodyMock,
  createCarServiceMock,
  createCarServiceMock2,
} from "../../__mocks__/car.mock";
import request from "../../utils/request";

describe("Integration Test: Create Car service", () => {
  beforeEach(async () => await prisma.car.deleteMany());
  afterAll(async () => await prisma.car.deleteMany());

  test("Should be able to create a car successfully", async () => {
    const { body, expectedValue } = createCarServiceMock;
    const received = await request
      .post("/cars")
      .send(body)
      .expect(201)
      .then((res) => res.body);

    expect(received).toStrictEqual(expectedValue);
  });

  test("Should be able to create a car withoud description", async () => {
    const { body, expectedValue } = createCarServiceMock2;
    const received = await request
      .post("/cars")
      .send(body)
      .expect(201)
      .then((res) => res.body);

    expect(received).toStrictEqual(expectedValue);
  });

  test("Should throw an error if body param is missing", async () => {
    const { body, expectedValue } = createCarInvalidBodyMock;
    const received = await request
      .post("/cars")
      .send(body)
      .expect(400)
      .then((res) => res.body);

    expect(received).toStrictEqual(expectedValue);
  });
});
