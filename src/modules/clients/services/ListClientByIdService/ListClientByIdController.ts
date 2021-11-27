import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListClientByIdService } from "./ListClientByIdService";

class ListClientByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const createClientService = container.resolve(ListClientByIdService);
    const client = await createClientService.execute(id);
    return response.json(client);
  }
}

export { ListClientByIdController };
