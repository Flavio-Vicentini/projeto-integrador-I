import { inject, injectable } from "tsyringe";

import { Client } from "../../entities/Client";
import { IClientsRepository } from "../../repositories/IClientsRepostiory";

@injectable()
class ListClientsService {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute(): Promise<Client[]> {
    const clients = await this.clientsRepository.listAllClients();
    return clients;
  }
}

export { ListClientsService };
