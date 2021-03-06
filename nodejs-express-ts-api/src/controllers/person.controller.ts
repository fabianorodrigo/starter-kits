import {Request} from "express";
import {ApplicationError} from "../customErrors/ApplicationError";
import {IPerson} from "../model";
import {FileSystemRepository} from "../repositories";
import {BaseController} from "./base.controller";

const DATABASE_PATH = `./data/person.json`;

export class PersonController extends BaseController<IPerson> {
  constructor() {
    super(`Person`, FileSystemRepository.getInstance("Person", DATABASE_PATH));
    this.repository.connect();
  }

  /**
   * If during POST or PUT, the entity has others attributes than these, it will throw an error.
   */
  protected allowedAttributes: ReadonlyArray<string> = [
    "id",
    "url",
    "name",
    "age",
  ];
  /**
   * If during POST or PUT, the entity miss these attributes, it will throw an error.
   */
  protected requiredAttributes: ReadonlyArray<string> = ["name", "age"];

  /**
   * Implements logic to get one person from repository
   * @param {number} id identifier of the person to get
   * @returns The Person with the given id
   */
  protected async readOneEntity(id: number): Promise<IPerson> {
    return this.repository.getById(id);
  }

  /**
   * Must implement the logic to read entities from the repository  accordingly with the filter.
   * @param req Request from client
   */
  protected readEntities(req: Request): Promise<ReadonlyArray<IPerson>> {
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
                .indexOf(v.toString().toLocaleLowerCase()) > -1
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
   * @param {Request<IPerson>} entity Expected to have a IPerson in the body
   */
  protected async createEntity(entity: IPerson): Promise<IPerson> {
    return this.repository.create(entity);
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
