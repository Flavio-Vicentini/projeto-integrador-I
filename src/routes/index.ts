import { Router } from "express";

import { clientsRoutes } from "./clients.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/clients", clientsRoutes);

export { router };
