import {Request, Response} from "express";
import {NotFoundError} from "../customErrors";
import {ApplicationError} from "../customErrors/ApplicationError";
import {IServerError as IServerError} from "../model";
import {IRepository} from "../repositories";

export abstract class BaseController<T> {
  constructor(
    //com o public readonly, o typescript cria um getter automaticamente (somente getter)
    public readonly entityName: string,
    protected readonly repository: IRepository<T>
  ) {}

  private readonly NOT_FOUND_ERROR: IServerError = {
    message: `${this.entityName} not found`,
  };

  /**
   * If during POST or PUT, the entity has others attributes than these, it will throw an error.
   */
  protected allowedAttributes: ReadonlyArray<string> = [];
  /**
   * If during POST or PUT, the entity miss these attributes, it will throw an error.
   */
  protected requiredAttributes: ReadonlyArray<string> = [];

  /**
   * Reads one entity from the database.
   *
   * @param {Request} req Request
   * @param {T|IServerError} res The entity when found
   */
  async getById(req: Request, res: Response<T | IServerError>): Promise<void> {
    try {
      const result = await this.readOneEntity(
        this.parseID(req.params["id"] as string)
      );
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json(this.NOT_FOUND_ERROR);
      }
    } catch (e: any) {
      if (e instanceof NotFoundError) {
        res.status(404).json(this.NOT_FOUND_ERROR);
      } else if (e instanceof ApplicationError) {
        res.status(400).json({message: e.message});
      } else {
        res.status(500).json({message: e.message});
      }
    }
  }

  /**
   * Must implement the logic to read one entity from the repository
   * @param {number} id id of the entity to read
   */
  protected abstract readOneEntity(id: number): Promise<T>;

  /**
   * Reads entities from the database accordingly with the filter.
   *
   * @param {Request} req Request
   * @param {T|IServerError} res The entity when found
   */
  async get(
    req: Request,
    res: Response<ReadonlyArray<T> | IServerError>
  ): Promise<void> {
    try {
      const result = await this.readEntities(req);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json(this.NOT_FOUND_ERROR);
      }
    } catch (e: any) {
      if (e instanceof NotFoundError) {
        res.status(404).json(this.NOT_FOUND_ERROR);
      } else if (e instanceof ApplicationError) {
        res.status(400).json({message: e.message});
      } else {
        res.status(500).json({message: e.message});
      }
    }
  }

  /**
   * Must implement the logic to read entities from the repository  accordingly with the filter.
   * @param req Request from client
   */
  protected abstract readEntities(req: Request): Promise<ReadonlyArray<T>>;

  /**
   * Writes a new entity to the database.
   *
   * @param {Request} req Request
   * @param {T|IServerError} res The entity created
   */
  async post(req: Request<T>, res: Response<T | IServerError>): Promise<void> {
    try {
      this.validateAttributes(req.body);
      const result = await this.createEntity(req.body);
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
   * @param entity Entity to create
   */
  protected abstract createEntity(entity: T): Promise<T>;

  /**
   * Update an entity in the database.
   *
   * @param {Request<T>} req Request
   * @param {T|IServerError} res The entity updated
   */
  async put(req: Request<T>, res: Response<T | IServerError>): Promise<void> {
    try {
      this.validateAttributes(req.body);
      if (!(await this.readOneEntity(req.body.id))) {
        res.status(404).json(this.NOT_FOUND_ERROR);
      }
      const result = await this.updateEntity(req);
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
      if (
        !(await this.readOneEntity(this.parseID(req.params["id"] as string)))
      ) {
        res.status(404).json(this.NOT_FOUND_ERROR);
        return;
      }
      await this.deleteEntity(req);
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

  /**
   * Validates if there is no unallowed attributes in the entity and if the required attributes are present.
   * @param entity Entity being sent
   */
  protected validateAttributes(entity: T): void {
    type TKey = keyof typeof entity;
    this.requiredAttributes.forEach((attribute) => {
      if (!entity[attribute as TKey])
        throw new ApplicationError(
          `${this.entityName} ${attribute} is required`
        );
    });
    Object.keys(entity).forEach((key) => {
      if (!this.allowedAttributes.includes(key)) {
        throw new ApplicationError(
          `'${key}' is not a recognized attribute for ${this.entityName}`
        );
      }
    });
  }
}
