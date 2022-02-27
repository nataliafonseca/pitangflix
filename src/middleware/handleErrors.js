import { AppError } from "../errors/AppError.js";
import { SchemaValidationError } from "../errors/SchemaValidationError.js";
import logger from "../utils/logger.js";

export function handleErrors(error, request, response, next) {
  if (error instanceof AppError) {
    logger.error(`${error.status} - ${error.message}`);
    return response.status(error.status).json({ error: error.message });
  }

  if (error instanceof SchemaValidationError) {
    logger.error(`${error.status} - ${error.message}: ${error.schema}`);
    return response
      .status(error.status)
      .json({ error: error.message, schema: error.schema });
  }

  return response
    .status(500)
    .json({ error: `Internal Server Error: ${error.message}` });
}
