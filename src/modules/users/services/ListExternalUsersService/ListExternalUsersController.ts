import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListExternalUsersService } from "./ListExternalUsersService";

class ListExternalUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserService = container.resolve(ListExternalUsersService);

    const users = await createUserService.execute();
    return response.json(users);
  }
}

export { ListExternalUsersController };
