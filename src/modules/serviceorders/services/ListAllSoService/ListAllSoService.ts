import { inject, injectable } from "tsyringe";

import { ServiceOrder } from "../../entities/ServiceOrder";
import { IServiceOrdersRepository } from "../../repositories/IServiceOrdersRepository";

@injectable()
class ListAllSoService {
  constructor(
    @inject("ServiceOrdersRepository")
    private serviceOrdersRepository: IServiceOrdersRepository
  ) {}
  async execute(): Promise<ServiceOrder[]> {
    const serviceOrders = await this.serviceOrdersRepository.listAllServiceOrders();
    return serviceOrders;
  }
}

export { ListAllSoService };
