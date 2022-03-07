import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";
import prismaClient from "../prisma/index.js";

export async function ensureAuthenticated(request, response, next) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError("Authorization missing", 401);
  }

  const [, token] = authorization.split(" ");

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prismaClient.user.findFirst({ where: { id } });

    if (!user) {
      throw new AppError("User does not exist", 401);
    }

    request.user = user;

    next();
  } catch (error) {
    throw new AppError("Invalid Token", 401);
  }
}
