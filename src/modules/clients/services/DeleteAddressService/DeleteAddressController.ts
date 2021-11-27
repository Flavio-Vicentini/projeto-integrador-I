import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteAddressService } from "./DeleteAddressService";

class DeleteAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteAddressService = container.resolve(DeleteAddressService);
    await deleteAddressService.execute(id);
    return response.send();
  }
}

export { DeleteAddressController };
