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

export { createCarServiceMock2, createCarServiceMock, UpdateCarServiceMock };
