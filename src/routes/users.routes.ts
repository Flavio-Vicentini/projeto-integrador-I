import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { AuthenticateUserController } from "../modules/users/services/AuthenticateUserService/AuthenticateUserController";
import { CreateUserController } from "../modules/users/services/CreateUserService/CreateUserController";
import { ListExternalUsersController } from "../modules/users/services/ListExternalUsersService/ListExternalUsersController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const listExternalUsersController = new ListExternalUsersController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/sessions", authenticateUserController.handle);

usersRoutes.get("/", ensureAuthenticate, listExternalUsersController.handle);

export { usersRoutes };
