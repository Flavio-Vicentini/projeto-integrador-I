import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAddressService } from "./CreateAddressService";

class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: id_client } = request.params;
    const {
      type,
      street_address,
      number,
      district,
      city,
      zip_code,
    } = request.body;
    const createAddressService = container.resolve(CreateAddressService);
    await createAddressService.execute({
      id_client,
      type,
      street_address,
      number,
      district,
      city,
      zip_code,
    });
    return response.status(201).send();
  }
}

export { CreateAddressController };
