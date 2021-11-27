import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { Client } from "../../entities/Client";
import { IClientsRepository } from "../../repositories/IClientsRepostiory";

@injectable()
class ListClientByIdService {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute(id: string): Promise<Client> {
    const client = await this.clientsRepository.listClientById(id);
    if (!client) {
      throw new AppError("Client does not exists.");
    }
    return client;
  }
}

export { ListClientByIdService };
