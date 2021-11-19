import { Request, Response } from "express";
import { container } from "tsyringe";

import { ServiceOrderMap } from "../../mappers/ServiceOrderMap";
import { ListAllSoService } from "./ListAllSoService";

class ListAllSoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllSoService = container.resolve(ListAllSoService);
    const serviceOrders = await listAllSoService.execute();
    return response.json(ServiceOrderMap.toDTO(serviceOrders));
  }
}

export { ListAllSoController };
