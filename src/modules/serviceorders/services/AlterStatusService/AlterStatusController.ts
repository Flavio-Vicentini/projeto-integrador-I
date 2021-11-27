import { Request, Response } from "express";
import { container } from "tsyringe";

import { AlterStatusService } from "./AlterStatusService";

class AlterStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { status } = request.body;
    const alterStatusService = container.resolve(AlterStatusService);
    await alterStatusService.execute(id, status);
    return response.status(204).send();
  }
}
export { AlterStatusController };
