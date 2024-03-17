import { sign } from "jsonwebtoken";
import prisma from "../../../database/database";
import { createCarServiceMock } from "../../__mocks__/car.mock";
import {
  createUserServiceMock2,
  createValidUserId,
  generateJWT,
} from "../../__mocks__/user.mocks";
import request from "../../utils/request";

describe("Integration Test: Delete Car Service", () => {
  beforeEach(async () => {
    await prisma.car.deleteMany();
    await prisma.user.deleteMany();
  });
  afterAll(async () => {
    await prisma.car.deleteMany();
    await prisma.user.deleteMany();
  });

  test("Should be able to delete car successfully", async () => {
    const userId = await createValidUserId();
    const token = sign({}, process.env.SECRET_KEY!, { subject: userId });
    const { id } = await prisma.car.create({
      data: { ...createCarServiceMock.body, userId },
    });

    await request
      .delete(`/cars/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const carDeleted = await prisma.car.findUnique({ where: { id } });

    expect(carDeleted).toBeNull();
  });

  test("Should throw an error if car id is invalid", async () => {
    const token = await generateJWT();

    const received = await request
      .delete("/cars/invalidId")
      .set("Authorization", `Bearer ${token}`)
      .expect(404)
      .then((res) => res.body);

    expect(received).toStrictEqual({ message: "Car not found." });
  });

  test("Should throw an error if user is not the car owner", async () => {

    const token = await generateJWT();
    const { id: userId } = await prisma.user.create({
      data: createUserServiceMock2.body,
    });
    const { id } = await prisma.car.create({
      data: { ...createCarServiceMock.body, userId },
    });

    const received = await request
      .delete(`/cars/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401)
      .then(res => res.body)

    expect(received).toStrictEqual({message: "User is not the car owner"});
  });
});
