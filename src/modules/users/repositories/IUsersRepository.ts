import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
  create({ name, email, password }: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(user_id: string): Promise<User>;
}
