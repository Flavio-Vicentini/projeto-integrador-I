import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ name, email, password }: ICreateUserDTO): Promise<void> {
    const hashedPassword = await hash(password, 8);
    await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}

export { CreateUserService };
