/* eslint-disable no-param-reassign */
import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class ListExternalUsersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute(): Promise<User[]> {
    const users = await this.usersRepository.listExternalUsers();
    users.forEach((user): void => {
      delete user.password;
      delete user.is_admin;
    });
    return users;
  }
}

export { ListExternalUsersService };
