import { compare, hash } from "bcrypt";
import Joi from "joi";
import { AppError } from "../errors/AppError.js";
import { SchemaValidationError } from "../errors/SchemaValidationError.js";
import prismaClient from "../prisma/index.js";
import Controller from "./Controller.js";
import jwt from "jsonwebtoken";

const schema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  email: Joi.string().required().max(100),
  password: Joi.string().required().min(6).max(100),
  birthDate: Joi.date().required().max(new Date()),
  reviewer: Joi.boolean(),
});

export default class UserController extends Controller {
  constructor() {
    super("user");
  }

  async store(request, response) {
    const schemaValidation = schema.validate(request.body, {
      abortEarly: false,
    });

    if (schemaValidation.error) {
      throw new SchemaValidationError(
        schemaValidation.error.details.map(({ message }) => message)
      );
    }

    request.body.password = await hash(request.body.password, 10);
    request.body.birthDate = new Date(request.body.birthDate);

    return super.store(request, response);
  }

  async update(request, response) {
    const schemaValidation = schema.validate(request.body, {
      abortEarly: false,
    });

    if (schemaValidation.error) {
      throw new SchemaValidationError(
        schemaValidation.error.details.map(({ message }) => message)
      );
    }

    request.body.password = await hash(request.body.password, 10);
    request.body.birthDate = new Date(request.body.birthDate);

    return super.update(request, response);
  }

  async login(request, response) {
    const { email, password } = request.body;
    const user = await prismaClient.user.findFirst({ where: { email } });

    if (!user) {
      throw new AppError("Invalid email/password combination.", 401);
    }

    const passwordChecksOut = await compare(password, user.password);

    if (!passwordChecksOut) {
      throw new AppError("Invalid email/password combination.", 401);
    }

    const token = jwt.sign({ id: user.id }, `${process.env.JWT_SECRET}`, {
      expiresIn: "1d",
    });

    return response.json({ user, token });
  }
}
