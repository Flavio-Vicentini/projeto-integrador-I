import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateAddressController } from "../modules/clients/services/CreateAddressService/CreateAddressController";
import { CreateClientController } from "../modules/clients/services/CreateClienteService/CreateClientController";
import { ListClientsController } from "../modules/clients/services/ListClientsService/ListClientsController";

const clientsRoutes = Router();

const createClientController = new CreateClientController();
const listClientsController = new ListClientsController();
const createAddressController = new CreateAddressController();

clientsRoutes.post(
  "/",
  ensureAuthenticate,
  ensureAdmin,
  createClientController.handle
);
clientsRoutes.get("/", ensureAuthenticate, listClientsController.handle);
clientsRoutes.post(
  "/address/:id",
  ensureAuthenticate,
  createAddressController.handle
);

export { clientsRoutes };
