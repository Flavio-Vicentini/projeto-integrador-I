import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateNoteService } from "./CreateNoteService";

class CreateNoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: id_order } = request.params;
    const { observations } = request.body;
    const createNoteService = container.resolve(CreateNoteService);
    createNoteService.execute(id_order, observations);
    return response.status(201).send();
  }
}
export { CreateNoteController };
