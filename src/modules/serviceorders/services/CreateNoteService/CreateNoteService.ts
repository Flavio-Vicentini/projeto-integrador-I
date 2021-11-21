import { inject, injectable } from "tsyringe";

import { INotesRepository } from "../../repositories/INotesRepository";

@injectable()
class CreateNoteService {
  constructor(
    @inject("NotesRepository")
    private notesRepository: INotesRepository
  ) {}
  async execute(id_order: string, observations: string): Promise<void> {
    await this.notesRepository.create(id_order, observations);
  }
}

export { CreateNoteService };
