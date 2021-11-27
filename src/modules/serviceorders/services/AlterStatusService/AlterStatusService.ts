import { inject, injectable } from "tsyringe";

import { IServiceOrdersRepository } from "../../repositories/IServiceOrdersRepository";

@injectable()
class AlterStatusService {
  constructor(
    @inject("ServiceOrdersRepository")
    private serviceOrdersRepository: IServiceOrdersRepository
  ) {}
  async execute(id: string, status: string): Promise<void> {
    const close_date = status === "Finalizado" ? new Date() : null;
    await this.serviceOrdersRepository.alterStatus(id, status, close_date);
  }
}

export { AlterStatusService };
