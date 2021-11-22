import { getRepository, Repository } from "typeorm";

import { ICreateClientDTO } from "../dtos/ICreateClientDTO";
import { Client } from "../entities/Client";
import { IClientsRepository } from "./IClientsRepostiory";

class ClientsRepository implements IClientsRepository {
  private repository: Repository<Client>;
  constructor() {
    this.repository = getRepository(Client);
  }

  async create({ name, cpf_cnpj, telephone }: ICreateClientDTO): Promise<void> {
    const client = this.repository.create({ name, cpf_cnpj, telephone });
    await this.repository.save(client);
  }

  findByCpfCnpj(cpf_cnpj: string): Promise<Client> {
    const client = this.repository.findOne({ cpf_cnpj });
    return client;
  }
  async listAllClients(): Promise<Client[]> {
    const clients = await this.repository.find({ relations: ["address"] });
    return clients;
  }
}

export { ClientsRepository };
