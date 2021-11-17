import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListClientsService } from "./ListClientsService";

class ListClientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createClientService = container.resolve(ListClientsService);
    const clients = await createClientService.execute();
    return response.json(clients);
  }
}

export { ListClientsController };
