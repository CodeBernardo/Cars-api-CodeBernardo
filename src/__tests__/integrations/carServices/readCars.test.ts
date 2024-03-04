import prisma from "../../../database/database";
import { createCarServiceMock } from "../../__mocks__/car.mock";
import request from "../../utils/request";

describe("Intergration Test: Read Car Service", () => {
  beforeEach(async () => await prisma.car.deleteMany());
  afterAll(async () => await prisma.car.deleteMany());

  test("Should be able to read cars successfully.", async () => {
    await prisma.car.create({ data: createCarServiceMock.body });

    const received = await request
      .get("/cars")
      .expect(200)
      .then((res) => res.body);

    expect(received).toBeDefined()
    expect(received).toHaveLength(1)
  });
});
