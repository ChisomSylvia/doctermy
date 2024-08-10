import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { json, urlencoded } from "express";
import { configDotenv } from "dotenv";
import indexRoute from "../routes/index.route.js";

export default (app) => {
  if (process.env.NODE_ENV !== "production") configDotenv();

  app.use(morgan());

  app.use(cors());
  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }))

  app.use(helmet());

  app.use(json());
  app.use(urlencoded({ extended: true }))

  app.use(cookieParser());

  app.use(indexRoute);
};
