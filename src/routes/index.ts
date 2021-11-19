import { Router } from "express";

import { clientsRoutes } from "./clients.routes";
import { serviceOrdersRoutes } from "./service_orders.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/clients", clientsRoutes);
router.use("/orders", serviceOrdersRoutes);

export { router };
