import prisma from "../../database/database";

const createUserServiceMock = {
  body: {
    name: "joao",
    email: "joao@mail.com",
    password: "1234",
  },
  expectedValue: {
    id: expect.any(String),
    name: "joao",
    email: "joao@mail.com",
  },
};

const createValidUserId = async () => {
  const { id } = await prisma.user.create({ data: createUserServiceMock.body });
  return id;
};

const createInvalidUserServiceMock = {
  body: {},
  expectedValue: {
    message: [
      {
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        path: ["name"],
        message: "Required",
      },
      {
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        path: ["email"],
        message: "Required",
      },
      {
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        path: ["password"],
        message: "Required",
      },
    ],
  },
};

const userLoginServiceMock = {
  body: {
    email: "joao@mail.com",
    password: "1234",
  },
  expectedValue: {
    accessToken: expect.any(String),
    user: {
      id: expect.any(String),
      name: "joao",
      email: "joao@mail.com",
    },
  },
};

export {
  createUserServiceMock,
  createInvalidUserServiceMock,
  userLoginServiceMock,
  createValidUserId,
};
