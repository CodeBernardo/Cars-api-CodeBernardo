import { sign } from "jsonwebtoken";
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

const createUserServiceMock2 = {
  body: {
    name: "pedro",
    email: "pedro@mail.com",
    password: "1234",
  },
  expectedValue: {
    id: expect.any(String),
    name: "pedro",
    email: "pedro@mail.com",
  },
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

const userInvalidLoginServiceMock = {
  body: {},
  expectedValue: {
    message: [
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

const userInvalidCredentials = {
  email: "invalid@email.com",
  password: "invalidPassword",
};

const createValidUserId = async () => {
  const { id } = await prisma.user.create({ data: createUserServiceMock.body });
  return id;
};

const generateJWT = async () => {
  const id = await createValidUserId();
  const jwt = sign({}, process.env.SECRET_KEY!, { subject: id });
  return jwt;
};

export {
  createUserServiceMock,
  createInvalidUserServiceMock,
  userLoginServiceMock,
  createValidUserId,
  userInvalidLoginServiceMock,
  userInvalidCredentials,
  generateJWT,
  createUserServiceMock2,
};
