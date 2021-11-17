import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateClientDTO } from "../../dtos/ICreateClientDTO";
import { IClientsRepository } from "../../repositories/IClientsRepostiory";

@injectable()
class CreateClientService {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute({
    name,
    cpf_cnpj,
    telephone,
  }: ICreateClientDTO): Promise<void> {
    const client = await this.clientsRepository.findByCpfCnpj(cpf_cnpj);
    if (client) {
      throw new AppError("Client already exists!");
    }
    await this.clientsRepository.create({ name, cpf_cnpj, telephone });
  }
}

export { CreateClientService };
