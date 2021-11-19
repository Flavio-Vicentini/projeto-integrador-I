import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateSoController } from "../modules/serviceorders/services/CreateSoService/CreateSoController";
import { ListAllSoController } from "../modules/serviceorders/services/ListAllSoService/ListAllSoController";

const serviceOrdersRoutes = Router();

const createSoController = new CreateSoController();
const listAllSoController = new ListAllSoController();

serviceOrdersRoutes.post("/", ensureAuthenticate, createSoController.handle);
serviceOrdersRoutes.get("/", ensureAuthenticate, listAllSoController.handle);

export { serviceOrdersRoutes };
