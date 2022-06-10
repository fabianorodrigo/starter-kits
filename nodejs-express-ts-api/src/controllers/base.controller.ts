import {Request, Response} from "express";
import {ApplicationError} from "../customErrors/ApplicationError";
import {ServerError as IServerError} from "../model";
import {IRepository} from "../repositories";

export abstract class BaseController<T> {
  constructor(
    protected entityName: string,
    protected repository: IRepository<T>
  ) {}

  /**
   * Reads one entity from the database.
   *
   * @param {Request} req Request
   * @param {T|IServerError} res The entity when found
   */
  async getById(req: Request, res: Response<T | IServerError>): Promise<void> {
    let result = await this.readOneEntity(req);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({message: `${this.entityName} not found`});
    }
  }

  /**
   * Must implement the logic to read one entity from the repository
   * @param req Request from client
   */
  protected abstract readOneEntity(req: Request): Promise<T>;

  /**
   * Reads entities from the database accordingly with the filter.
   *
   * @param {Request} req Request
   * @param {T|IServerError} res The entity when found
   */
  async get(req: Request, res: Response<T[] | IServerError>): Promise<void> {
    let result = await this.readEntities(req);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({message: `${this.entityName} not found`});
    }
  }

  /**
   * Must implement the logic to read entities from the repository  accordingly with the filter.
   * @param req Request from client
   */
  protected abstract readEntities(req: Request): Promise<T[]>;

  /**
   * Writes a new entity to the database.
   *
   * @param {Request} req Request
   * @param {T|IServerError} res The entity created
   */
  async post(req: Request<T>, res: Response<T | IServerError>): Promise<void> {
    try {
      let result = await this.createEntity(req);
      res.status(201).json(result);
    } catch (e: any) {
      if (e.domain) {
        res.status(400).json({message: e.message});
      } else {
        res.status(500).json({message: e.message});
      }
      return;
    }
  }
  /**
   * Must implement the logic to create a new entity in the repository
   * @param req Request from client
   */
  protected abstract createEntity(req: Request<T>): Promise<T>;

  /**
   * Update an entity in the database.
   *
   * @param {Request<T>} req Request
   * @param {T|IServerError} res The entity updated
   */
  async put(req: Request<T>, res: Response<T | IServerError>): Promise<void> {
    try {
      let result = await this.updateEntity(req);
      res.status(200).json(result);
    } catch (e: any) {
      if (e.domain) {
        res.status(400).json({message: e.message});
      } else {
        res.status(500).json({message: e.message});
      }
      return;
    }
  }
  /**
   * Must implement the logic to update a entity in the repository
   * @param req Request from client
   */
  protected abstract updateEntity(req: Request<T>): Promise<T>;

  /**
   * Delete an entity from the database.
   *
   * @param {Request<T>} req Request
   * @param {T|IServerError} res The entity when found
   */
  async delete(req: Request, res: Response<T | IServerError>): Promise<void> {
    try {
      let result = await this.deleteEntity(req);
      res.status(200).send();
    } catch (e: any) {
      if (e.domain) {
        res.status(400).json({message: e.message});
      } else {
        res.status(500).json({message: e.message});
      }
      return;
    }
  }
  /**
   * Must implement the logic to update a entity in the repository
   * @param req Request from client
   */
  protected abstract deleteEntity(req: Request): Promise<boolean>;

  /**
   * Validates if the ID is a valid number. IF it is, returns type number. IF not, throws an error.
   * @param ID The ID of the entity
   */
  protected parseID(ID: string): number {
    if (!ID || ID.length === 0)
      throw new ApplicationError(`${this.entityName} ID is required`);
    return parseInt(ID);
  }
}
