import { container } from "tsyringe";

import { ClientsRepository } from "../../modules/clients/repositories/ClientsRepository";
import { IClientsRepository } from "../../modules/clients/repositories/IClientsRepostiory";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/users/repositories/UsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IClientsRepository>(
  "ClientsRepository",
  ClientsRepository
);
