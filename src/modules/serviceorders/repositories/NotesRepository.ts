import { getRepository, Repository } from "typeorm";

import { Note } from "../entities/Note";
import { INotesRepository } from "./INotesRepository";

class NotesRepository implements INotesRepository {
  private repository: Repository<Note>;
  constructor() {
    this.repository = getRepository(Note);
  }
  async create(id_order: string, observations: string): Promise<void> {
    const note = await this.repository.create({ id_order, observations });
    await this.repository.save(note);
  }
}

export { NotesRepository };
