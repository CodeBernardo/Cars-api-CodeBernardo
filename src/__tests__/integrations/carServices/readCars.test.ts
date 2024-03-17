import prisma from "../../../database/database";
import { createCarServiceMock } from "../../__mocks__/car.mock";
import { createValidUserId } from "../../__mocks__/user.mocks";
import request from "../../utils/request";

describe("Intergration Test: Read Car Service", () => {
  beforeEach(async () => {
    await prisma.car.deleteMany();
    await prisma.user.deleteMany();
  });
  afterAll(async () => {
    await prisma.car.deleteMany();
    await prisma.user.deleteMany();
  });

  test("Should be able to read cars successfully.", async () => {
    const userId = await createValidUserId();
    await prisma.car.create({ data: { ...createCarServiceMock.body, userId } });

    const received = await request
      .get("/cars")
      .expect(200)
      .then((res) => res.body);

    expect(received).toBeDefined();
    expect(received).toHaveLength(1);
  });

  test("Should be able to read cars by userId successfully.", async () => {
    const userId = await createValidUserId();
    await prisma.car.create({
      data: { ...createCarServiceMock.body, userId },
    });

    const received = await request
      .get("/cars")
      .query({ userId })
      .expect(200)
      .then((res) => res.body);

    expect(received).toBeDefined();
    expect(received).toHaveLength(1);
    expect(received[0].userId).toBeDefined();
  });
});
