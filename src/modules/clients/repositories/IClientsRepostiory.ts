import { ICreateClientDTO } from "../dtos/ICreateClientDTO";
import { Client } from "../entities/Client";

export interface IClientsRepository {
  create({ name, cpf_cnpj, telephone }: ICreateClientDTO): Promise<void>;
  findByCpfCnpj(cpf_cnpj: string): Promise<Client>;
  listAllClients(): Promise<Client[]>;
  listClientById(id: string): Promise<Client>;
  deleteClientById(id: string): Promise<void>;
}
