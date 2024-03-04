import { ZodError } from "zod";

const createCarServiceMock = {
  body: {
    name: "Car name",
    description: "Car description",
    brand: "Card brand",
    year: 2023,
    km: 10000,
  },
  expectedValue: {
    id: expect.any(String),
    name: "Car name",
    description: "Car description",
    brand: "Card brand",
    year: 2023,
    km: 10000,
  },
};

const createCarServiceMock2 = {
  body: {
    name: "Car name",
    brand: "Card brand",
    year: 2023,
    km: 10000,
  },
  expectedValue: {
    id: expect.any(String),
    name: "Car name",
    description: null,
    brand: "Card brand",
    year: 2023,
    km: 10000,
  },
};

const UpdateCarServiceMock = {
  body: {
    name: "Updated car name",
    description: "Updated decription",
  },
  expectedValue: {
    id: expect.any(String),
    name: "Updated car name",
    description: "Updated decription",
    brand: "Card brand",
    year: 2023,
    km: 10000,
  },
};

const createCarInvalidBodyMock = {
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
        path: ["brand"],
        message: "Required",
      },
      {
        code: "invalid_type",
        expected: "number",
        received: "undefined",
        path: ["year"],
        message: "Required",
      },
      {
        code: "invalid_type",
        expected: "number",
        received: "undefined",
        path: ["km"],
        message: "Required",
      },
    ],
  },
};

const UpdateCarinvalidBodyMock = {
  body: {
    name: 1,
  },
  expectedValue: {
    message: [
      {
        code: "invalid_type",
        expected: "string",
        received: "number",
        path: ["name"],
        message: "Expected string, received number",
      },
    ],
  },
};

export {
  createCarServiceMock2,
  createCarServiceMock,
  UpdateCarServiceMock,
  createCarInvalidBodyMock,
  UpdateCarinvalidBodyMock
};
