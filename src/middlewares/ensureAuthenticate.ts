import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/users/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "projeto-integrador-secret"
    ) as IPayload;
    const userRepository = new UsersRepository();
    const user = await userRepository.findById(user_id);
    if (!user) {
      throw new AppError("User does not exists", 401);
    }
    request.user = {
      id: user_id,
    };
    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
