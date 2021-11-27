import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateAddressDTO } from "../../dtos/ICreateAddressDTO";
import { IAddressRepository } from "../../repositories/IAddressRepository";
import { IClientsRepository } from "../../repositories/IClientsRepostiory";

@injectable()
class CreateAddressService {
  constructor(
    @inject("AddressRepository")
    private addressRepository: IAddressRepository,
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute({
    id_client,
    type,
    street_address,
    number,
    district,
    city,
    zip_code,
  }: ICreateAddressDTO): Promise<void> {
    const client = await this.clientsRepository.listClientById(id_client);
    if (!client) {
      throw new AppError("Client does not exists.");
    }
    await this.addressRepository.create({
      id_client,
      type,
      street_address,
      number,
      district,
      city,
      zip_code,
    });
  }
}

export { CreateAddressService };
