import {Request, Response} from "express";
import fs from "fs";
import {ApplicationError} from "../customErrors/ApplicationError";
import {IPerson, ServerError as IServerError} from "../model";
import BaseFileSystemRepository from "../repositories/base.filesystem.repository";
import {BaseController} from "./base.controller";
import {getNextId} from "./common.controller";

const DATABASE_PATH = `./data/person.json`;

export class PersonController extends BaseController<IPerson> {
  constructor() {
    super(`Person`, new BaseFileSystemRepository("Person", DATABASE_PATH));
    this.repository.connect();
  }

  /**
   * Implements logic to get one person from repository
   * @param req Expected to contain a path parameter "id".
   * @param res
   * @returns
   */
  protected async readOneEntity(req: Request): Promise<IPerson> {
    const ID = this.parseID(req.params["id"] as string);
    return this.repository.getById(ID);
  }

  /**
   * Must implement the logic to read entities from the repository  accordingly with the filter.
   * @param req Request from client
   */
  protected readEntities(req: Request): Promise<IPerson[]> {
    if (req.body.filter && req.body.filter.attribute) {
      const k = req.body.filter.attribute;
      const v = req.body.filter.value;
      return new Promise(async (resolve) => {
        const rows = await this.repository.getAll();
        if (rows.length == 0) {
          resolve([]);
        }
        type IPersonKey = keyof typeof rows[0];
        resolve(
          rows.filter((row) => {
            return (
              (row[k as IPersonKey] as string)
                .toString()
                .toLocaleLowerCase()
                .indexOf(v.toLocaleLowerCase()) > -1
            );
          })
        );
      });
    } else {
      return this.repository.getAll();
    }
  }

  /**
   * Write a new person registry to the database.
   * @param {Request<IPerson>} req Expected to have a IPerson in the body
   */
  protected async createEntity(req: Request<IPerson>): Promise<IPerson> {
    if (req.body.id) {
      throw new ApplicationError("Person's already has an id, use PUT instead");
    }
    return this.repository.create(req.body);
  }

  /**
   * Updates a person's registry in the database.
   * @param {Request<IPerson>} req Expected to have a IPerson in the body
   */
  protected async updateEntity(req: Request<IPerson>): Promise<IPerson> {
    if (!req.body.id) {
      throw new ApplicationError(
        "Person's has no ID. If want to register a new person, use POST instead"
      );
    }
    return this.repository.update(req.body);
  }

  /**
   * Must implement the logic to update a entity in the repository
   * @param req Request from client
   */
  protected deleteEntity(req: Request): Promise<boolean> {
    const ID = this.parseID(req.params["id"] as string);
    return this.repository.delete(ID);
  }
}
