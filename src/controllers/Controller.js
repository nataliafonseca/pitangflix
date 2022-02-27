import { AppError } from "../errors/AppError.js";
import prismaClient from "../prisma/index.js";

export default class Controller {
  constructor(model) {
    this.model = model;
    this.client = prismaClient[model];

    if (!this.client) {
      throw new AppError(`Model: ${model} not found on Prisma Schema`, 404);
    }
  }

  /**
   * @description Get one registry by id according to Model name
   * @param {*} request
   * @param {*} response
   * @returns {Promise<*>}
   */
  async getOne(request, response) {
    const { id } = request.params;

    const registry = await this.client.findUnique({
      where: {
        id,
      },
    });

    if (!registry) {
      throw new AppError(`Registry with id: ${id} not found`, 404);
    }

    return response.json(registry);
  }

  /**
   * @description Get all registries according to Model name
   * @param {*} request
   * @param {*} response
   * @returns {Promise<*>}
   */
  async index(request, response) {
    const registries = await prismaClient[this.model].findMany();

    return response.json(registries);
  }

  /**
   * @description Create a new registry according to Model name
   * @param {*} request
   * @param {*} response
   * @returns {Promise<*>}
   */
  async store(request, response) {
    const registry = await this.client.create({
      data: request.body,
    });

    return response.json(registry);
  }

  /**
   * @description Removes one registry by id according to Model name
   * @param {*} request
   * @param {*} response
   * @returns {Promise<*>}
   */
  async remove(request, response) {
    const { id } = request.params;

    try {
      await this.client.delete({ where: { id } });

      return response.json({ message: "Registry removed" });
    } catch (error) {
      throw new AppError(`Registry with id ${id} not found`, 404);
    }
  }

  /**
   * @description Updates one registry by id according to Model name
   * @param {*} request
   * @param {*} response
   * @returns {Promise<*>}
   */
  async update(request, response) {
    const { id } = request.params;

    try {
      const registry = await this.client.update({
        data: request.body,
        where: { id },
      });

      return response.json(registry);
    } catch (error) {
      throw new AppError(`Registry with id ${id} not found`, 404);
    }
  }
}
