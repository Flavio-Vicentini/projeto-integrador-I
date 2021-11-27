import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { INotesRepository } from "../../repositories/INotesRepository";
import { IServiceOrdersRepository } from "../../repositories/IServiceOrdersRepository";

@injectable()
class CreateNoteService {
  constructor(
    @inject("NotesRepository")
    private notesRepository: INotesRepository,
    @inject("ServiceOrdersRepository")
    private serviceOrdersRepository: IServiceOrdersRepository
  ) {}
  async execute(id_order: string, observations: string): Promise<void> {
    const order = await this.serviceOrdersRepository.findById(id_order);
    if (!order) {
      throw new AppError("Service order does not exists.");
    }
    await this.notesRepository.create(id_order, observations);
  }
}

export { CreateNoteService };
