import { container } from "tsyringe";

import { ClientsRepository } from "../../modules/clients/repositories/ClientsRepository";
import { IClientsRepository } from "../../modules/clients/repositories/IClientsRepostiory";
import { INotesRepository } from "../../modules/serviceorders/repositories/INotesRepository";
import { IServiceOrdersRepository } from "../../modules/serviceorders/repositories/IServiceOrdersRepository";
import { NotesRepository } from "../../modules/serviceorders/repositories/NotesRepository";
import { ServiceOrdersRepository } from "../../modules/serviceorders/repositories/ServiceOrdersRepository";
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
container.registerSingleton<IServiceOrdersRepository>(
  "ServiceOrdersRepository",
  ServiceOrdersRepository
);
container.registerSingleton<INotesRepository>(
  "NotesRepository",
  NotesRepository
);
