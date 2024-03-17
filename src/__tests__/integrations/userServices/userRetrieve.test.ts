import { sign } from "jsonwebtoken";
import prisma from "../../../database/database";
import { createUserServiceMock } from "../../__mocks__/user.mocks";
import request from "../../utils/request";

describe("Integration Tests: User Retrieve Service", () => {
  beforeEach(async () => await prisma.user.deleteMany());
  afterAll(async () => await prisma.user.deleteMany());

  test("Should be able to get user profile successfully", async () => {
    const { body, expectedValue } = createUserServiceMock;
    const { id } = await prisma.user.create({ data: body });
    const jwt = sign({}, process.env.SECRET_KEY!, { subject: id });

    const received = await request
      .get("/users")
      .set("Authorization", `Bearer ${jwt}`)
      .expect(200)
      .then((res) => res.body);

      expect(received).toStrictEqual(expectedValue)
  });

  test("Should throw an error if jwt is missing", async () => {
        const received = await request
          .get("/users")
          .expect(401)
          .then((res) => res.body);

        expect(received).toStrictEqual({ message: "Token is required" });
  })
});
