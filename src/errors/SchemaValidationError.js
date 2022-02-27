export class SchemaValidationError {
  constructor(schema) {
    this.message = "Invalid data";
    this.status = 400;
    this.schema = schema;
  }
}
