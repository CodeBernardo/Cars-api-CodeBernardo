import prisma from "../../../database/database";
import {
  createCarInvalidBodyMock,
  createCarServiceMock,
  createCarServiceMock2,
} from "../../__mocks__/car.mock";
import { generateJWT } from "../../__mocks__/user.mocks";
import request from "../../utils/request";

describe("Integration Test: Create Car service", () => {
  beforeEach(async () => {
    await prisma.car.deleteMany();
    await prisma.user.deleteMany();
  });
  afterAll(async () => {
    await prisma.car.deleteMany();
    await prisma.user.deleteMany();
  });

  test("Should be able to create a car successfully", async () => {
    const token = await generateJWT();
    const { body, expectedValue } = createCarServiceMock2;
    const received = await request
      .post("/cars")
      .send(body)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .then((res) => res.body);

    expect(received).toStrictEqual(expectedValue);
  });

  test("Should be able to create a car withoud description", async () => {
    const token = await generateJWT();
    const { body, expectedValue } = createCarServiceMock2;
    const received = await request
      .post("/cars")
      .set("Authorization", `Bearer ${token}`)
      .send(body)
      .expect(201)
      .then((res) => res.body);

    expect(received).toStrictEqual(expectedValue);
  });

  test("Should throw an error if body param is missing", async () => {
    const token = await generateJWT();
    const { body, expectedValue } = createCarInvalidBodyMock;
    const received = await request
      .post("/cars")
      .set("Authorization", `Bearer ${token}`)
      .send(body)
      .expect(400)
      .then((res) => res.body);

    expect(received).toStrictEqual(expectedValue);
  });
});
