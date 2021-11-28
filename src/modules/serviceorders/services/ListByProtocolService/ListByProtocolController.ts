import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProtocolMap } from "../../mappers/ProtocolMap";
import { ListByProtocolService } from "./ListByProtocolService";

class ListByProtocolController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { protocol } = request.params;
    const listByProtocolService = container.resolve(ListByProtocolService);
    const order = await listByProtocolService.execute(protocol);
    return response.json(ProtocolMap.toDTO(order));
  }
}

export { ListByProtocolController };
