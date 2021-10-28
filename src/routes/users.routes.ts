import { Router, Response, Request } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { AuthenticateUserController } from "../modules/users/services/AuthenticateUserService/AuthenticateUserController";
import { CreateUserController } from "../modules/users/services/CreateUserService/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/sessions", authenticateUserController.handle);

usersRoutes.get(
  "/protocols",
  ensureAuthenticate,
  (request: Request, response: Response) => {
    console.log(request.headers.authorization);
    return response.json({ message: "Voce esta dentro dos protocolos" });
  }
);

export { usersRoutes };
