import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateClientService } from "./CreateClientService";

class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf_cnpj, telephone } = request.body;
    const createClientService = container.resolve(CreateClientService);
    await createClientService.execute({ name, cpf_cnpj, telephone });
    return response.status(201).send();
  }
}

export { CreateClientController };
