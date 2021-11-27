import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IAddressRepository } from "../../repositories/IAddressRepository";

@injectable()
class DeleteAddressService {
  constructor(
    @inject("AddressRepository")
    private addressRepository: IAddressRepository
  ) {}

  async execute(id: string): Promise<void> {
    const address = await this.addressRepository.findById(id);
    if (!address) {
      throw new AppError("Address not found");
    }
    await this.addressRepository.deleteAddressById(id);
  }
}

export { DeleteAddressService };
