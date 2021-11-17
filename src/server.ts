import express, {
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from "express";

import "reflect-metadata";
import "express-async-errors";
import "./shared/container";
import createConnection from "./database/index";
import { AppError } from "./errors/AppError";
import { router } from "./routes";

createConnection();

const app = express();

app.use(express.json() as RequestHandler);
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("Server is Running!"));
