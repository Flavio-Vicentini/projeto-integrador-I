import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUsersRepository } from "./IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(user);
  }
  async findByEmail(email: string): Promise<User> {
    // const rawData = await this.repository.query(
    //   `SELECT * FROM users where email = '${email}'`
    // );
    // console.log(rawData[0].id);
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(user_id: string): Promise<User> {
    const user = await this.repository.findOne(user_id);
    return user;
  }
}

export { UsersRepository };
