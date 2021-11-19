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
    close_date,
    open_date,
    requester_name,
    requester_phone,
    status,
  }: ICreateServiceOrderDTO): Promise<void> {
    const protocol = generateProtocol();
    await this.serviceOrdersRepository.create({
      id_client,
      id_external_user,
      id_open_so_user,
      protocol,
      defect,
      close_date,
      open_date,
      requester_name,
      requester_phone,
      status,
    });
  }
}

export { CreateSoService };
