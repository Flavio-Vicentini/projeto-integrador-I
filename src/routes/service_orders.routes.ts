import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateNoteController } from "../modules/serviceorders/services/CreateNoteService/CreateNoteController";
import { CreateSoController } from "../modules/serviceorders/services/CreateSoService/CreateSoController";
import { FinishSoController } from "../modules/serviceorders/services/FinishSoService/FinishSoController";
import { ListAllSoController } from "../modules/serviceorders/services/ListAllSoService/ListAllSoController";

const serviceOrdersRoutes = Router();

const createSoController = new CreateSoController();
const listAllSoController = new ListAllSoController();
const finishSoController = new FinishSoController();
const createNoteController = new CreateNoteController();

serviceOrdersRoutes.post("/", ensureAuthenticate, createSoController.handle);
serviceOrdersRoutes.get("/", ensureAuthenticate, listAllSoController.handle);
serviceOrdersRoutes.patch(
  "/status/:id",
  ensureAuthenticate,
  finishSoController.handle
);
serviceOrdersRoutes.post(
  "/notes/:id",
  ensureAuthenticate,
  createNoteController.handle
);

export { serviceOrdersRoutes };
