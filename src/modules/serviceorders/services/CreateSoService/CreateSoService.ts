import { inject, injectable } from "tsyringe";

import { generateProtocol } from "../../../../utils/generateProtocol";
import { ICreateServiceOrderDTO } from "../../dtos/ICreateServiceOrderDTO";
import { IServiceOrdersRepository } from "../../repositories/IServiceOrdersRepository";

@injectable()
class CreateSoService {
  constructor(
    @inject("ServiceOrdersRepository")
    private serviceOrdersRepository: IServiceOrdersRepository
  ) {}
  async execute({
    id_client,
    id_external_user,
    id_open_so_user,
    defect,
    requester_name,
    requester_phone,
  }: ICreateServiceOrderDTO): Promise<void> {
    const protocol = generateProtocol();
    const open_date = new Date();
    const status = "Aberto";
    await this.serviceOrdersRepository.create({
      id_client,
      id_external_user,
      id_open_so_user,
      protocol,
      defect,
      open_date,
      requester_name,
      requester_phone,
      status,
    });
  }
}

export { CreateSoService };
