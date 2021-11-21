import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSoService } from "./CreateSoService";

class CreateSoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id_client,
      id_external_user,
      defect,
      requester_name,
      requester_phone,
    } = request.body;
    const { id: id_open_so_user } = request.user;
    const createSoService = container.resolve(CreateSoService);

    await createSoService.execute({
      id_client,
      id_external_user,
      id_open_so_user,
      defect,
      requester_name,
      requester_phone,
    });
    return response.status(201).send();
  }
}

export { CreateSoController };
