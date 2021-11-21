import { Request, Response } from "express";
import { container } from "tsyringe";

import { FinishSoService } from "./FinishSoService";

class FinishSoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { status } = request.body;
    const finishSoService = container.resolve(FinishSoService);
    await finishSoService.execute(id, status);
    return response.status(204).send();
  }
}
export { FinishSoController };
