import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateClientController } from "../modules/clients/services/CreateClienteService/CreateClientController";
import { ListClientsController } from "../modules/clients/services/ListClientsService/ListClientsController";

const clientsRoutes = Router();

const createClientController = new CreateClientController();
const listClientsController = new ListClientsController();

clientsRoutes.post(
  "/",
  ensureAuthenticate,
  ensureAdmin,
  createClientController.handle
);
clientsRoutes.get("/", ensureAuthenticate, listClientsController.handle);

export { clientsRoutes };
