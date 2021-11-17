import { Request, Response, NextFunction } from "express";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/users/repositories/UsersRepository";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user;
  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);
  if (!user.is_admin) {
    throw new AppError("User is not admin.");
  }
  return next();
}
