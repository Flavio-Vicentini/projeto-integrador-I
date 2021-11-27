import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ServiceOrder } from "../../entities/ServiceOrder";
import { IServiceOrdersRepository } from "../../repositories/IServiceOrdersRepository";

@injectable()
class ListByProtocolService {
  constructor(
    @inject("ServiceOrdersRepository")
    private serviceOrdersRepository: IServiceOrdersRepository
  ) {}
  async execute(protocol: string): Promise<ServiceOrder> {
    const serviceOrder = await this.serviceOrdersRepository.listByProtocol(
      protocol
    );
    if (!serviceOrder) {
      throw new AppError("Service order doest not exists.");
    }
    return serviceOrder;
  }
}

export { ListByProtocolService };
