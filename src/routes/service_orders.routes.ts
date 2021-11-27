import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { AlterStatusController } from "../modules/serviceorders/services/AlterStatusService/AlterStatusController";
import { CreateNoteController } from "../modules/serviceorders/services/CreateNoteService/CreateNoteController";
import { CreateSoController } from "../modules/serviceorders/services/CreateSoService/CreateSoController";
import { ListAllSoController } from "../modules/serviceorders/services/ListAllSoService/ListAllSoController";
import { ListByProtocolController } from "../modules/serviceorders/services/ListByProtocolService/ListByProtocolController";

const serviceOrdersRoutes = Router();

const createSoController = new CreateSoController();
const listAllSoController = new ListAllSoController();
const alterStatusController = new AlterStatusController();
const createNoteController = new CreateNoteController();
const listByProtocolController = new ListByProtocolController();

serviceOrdersRoutes.post("/", ensureAuthenticate, createSoController.handle);
serviceOrdersRoutes.get("/", ensureAuthenticate, listAllSoController.handle);
serviceOrdersRoutes.patch(
  "/status/:id",
  ensureAuthenticate,
  alterStatusController.handle
);
serviceOrdersRoutes.post(
  "/notes/:id",
  ensureAuthenticate,
  createNoteController.handle
);
serviceOrdersRoutes.get("/protocol", listByProtocolController.handle);
export { serviceOrdersRoutes };
