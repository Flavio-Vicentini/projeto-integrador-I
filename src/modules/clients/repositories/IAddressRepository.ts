import { ICreateAddressDTO } from "../dtos/ICreateAddressDTO";
import { Address } from "../entities/Address";

export interface IAddressRepository {
  create({
    id_client,
    type,
    street_address,
    number,
    district,
    zip_code,
  }: ICreateAddressDTO): Promise<void>;
  deleteAddressById(id: string): Promise<void>;
  findById(id: string): Promise<Address>;
}
