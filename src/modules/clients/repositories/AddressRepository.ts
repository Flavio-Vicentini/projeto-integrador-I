import { getRepository, Repository } from "typeorm";

import { ICreateAddressDTO } from "../dtos/ICreateAddressDTO";
import { Address } from "../entities/Address";
import { IAddressRepository } from "./IAddressRepository";

class AddressRepository implements IAddressRepository {
  private repository: Repository<Address>;
  constructor() {
    this.repository = getRepository(Address);
  }

  async create({
    id_client,
    type,
    street_address,
    number,
    district,
    city,
    zip_code,
  }: ICreateAddressDTO): Promise<void> {
    const address = this.repository.create({
      id_client,
      type,
      street_address,
      number,
      district,
      city,
      zip_code,
    });
    await this.repository.save(address);
  }

  async deleteAddressById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<Address> {
    const address = await this.repository.findOne(id);
    return address;
  }
}

export { AddressRepository };
