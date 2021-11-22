import { inject, injectable } from "tsyringe";

import { ICreateAddressDTO } from "../../dtos/ICreateAddressDTO";
import { IAddressRepository } from "../../repositories/IAddressRepository";
import { IClientsRepository } from "../../repositories/IClientsRepostiory";

@injectable()
class CreateAddressService {
  constructor(
    @inject("AddressRepository")
    private addressRepository: IAddressRepository
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
