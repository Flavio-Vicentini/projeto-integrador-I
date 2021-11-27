import { getRepository, Repository } from "typeorm";

import { ICreateServiceOrderDTO } from "../dtos/ICreateServiceOrderDTO";
import { ServiceOrder } from "../entities/ServiceOrder";
import { IServiceOrdersRepository } from "./IServiceOrdersRepository";

class ServiceOrdersRepository implements IServiceOrdersRepository {
  private repository: Repository<ServiceOrder>;
  constructor() {
    this.repository = getRepository(ServiceOrder);
  }

  async create({
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
  }: ICreateServiceOrderDTO): Promise<void> {
    const serviceOrder = this.repository.create({
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
    await this.repository.save(serviceOrder);
  }
  async listAllServiceOrders(): Promise<ServiceOrder[]> {
    const serviceOrders = await this.repository.find({
      relations: ["client", "external_user", "open_so_user", "notes"],
    });
    return serviceOrders;
  }

  async alterStatus(
    id: string,
    status: string,
    close_date: Date
  ): Promise<void> {
    await this.repository.save({ id, status, close_date });
  }

  async findById(id: string): Promise<ServiceOrder> {
    const order = await this.repository.findOne(id);
    return order;
  }

  async listByProtocol(protocol: string): Promise<ServiceOrder> {
    const order = await this.repository.findOne(
      { protocol },
      { relations: ["client", "external_user", "open_so_user", "notes"] }
    );
    return order;
  }
}

export { ServiceOrdersRepository };
