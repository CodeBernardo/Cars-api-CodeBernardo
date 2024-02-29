import cors from "cors";
import helmet from "helmet";
import "reflect-metadata";
import "express-async-errors";
import express, { Application, json } from "express";
import  handleErrors  from "./middlewares/handleErrors.middleware";

export const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(json());

app.use(handleErrors)