import Controller from "./Controller.js";
import Joi from "joi";
import { SchemaValidationError } from "../errors/SchemaValidationError.js";

const schema = Joi.object({
  title: Joi.string().required().min(3).max(50),
  description: Joi.string().required().max(5000),
  duration: Joi.number().required().positive().max(500),
  classification: Joi.string(),
});

class MovieController extends Controller {
  constructor() {
    super("movie");
  }

  store(request, response) {
    const schemaValidation = schema.validate(request.body, {
      abortEarly: false,
    });

    if (schemaValidation.error) {
      throw new SchemaValidationError(
        schemaValidation.error.details.map(({ message }) => message)
      );
    }

    return super.store(request, response);
  }

  update(request, response) {
    const schemaValidation = schema.validate(request.body, {
      abortEarly: false,
    });

    if (schemaValidation.error) {
      throw new SchemaValidationError(
        schemaValidation.error.details.map(({ message }) => message)
      );
    }

    return super.update(request, response);
  }
}

export default MovieController;
