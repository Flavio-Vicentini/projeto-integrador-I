import { ICreateAddressDTO } from "../dtos/ICreateAddressDTO";

export interface IAddressRepository {
  create({
    id_client,
    type,
    street_address,
    number,
    district,
    zip_code,
  }: ICreateAddressDTO): Promise<void>;
}
