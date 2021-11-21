import { ICreateServiceOrderDTO } from "../dtos/ICreateServiceOrderDTO";
import { ServiceOrder } from "../entities/ServiceOrder";

export interface IServiceOrdersRepository {
  create({
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
  }: ICreateServiceOrderDTO): Promise<void>;
  listAllServiceOrders(): Promise<ServiceOrder[]>;
  finishSo(id: string, status: string, close_date: Date): Promise<void>;
}
