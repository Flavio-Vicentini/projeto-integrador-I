import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateAddressController } from "../modules/clients/services/CreateAddressService/CreateAddressController";
import { CreateClientController } from "../modules/clients/services/CreateClienteService/CreateClientController";
import { DeleteAddressController } from "../modules/clients/services/DeleteAddressService/DeleteAddressController";
import { ListClientByIdController } from "../modules/clients/services/ListClientByIdService/ListClientByIdController";
import { ListClientsController } from "../modules/clients/services/ListClientsService/ListClientsController";

const clientsRoutes = Router();

const createClientController = new CreateClientController();
const listClientsController = new ListClientsController();
const createAddressController = new CreateAddressController();
const listClientByIdController = new ListClientByIdController();
const deleteAddressController = new DeleteAddressController();

clientsRoutes.post(
  "/",
  ensureAuthenticate,
  ensureAdmin,
  createClientController.handle
);
clientsRoutes.get("/", ensureAuthenticate, listClientsController.handle);
clientsRoutes.get("/:id", ensureAuthenticate, listClientByIdController.handle);

// address
clientsRoutes.post(
  "/address/:id",
  ensureAuthenticate,
  createAddressController.handle
);
clientsRoutes.delete(
  "/address/:id",
  ensureAuthenticate,
  deleteAddressController.handle
);

export { clientsRoutes };
