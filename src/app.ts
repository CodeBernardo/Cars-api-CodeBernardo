import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import express, { Application, json } from "express";
import handleErrors from "./middlewares/handleErrors.middleware";
import carRouter from "./routes/car.routes";
import userRouter from "./routes/user.routes";

export const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use("/cars", carRouter);
app.use("/users", userRouter);

app.use(handleErrors);
