import fs, {WriteFileOptions} from "fs";
import path from "path";
import {ApplicationError} from "../customErrors/ApplicationError";
import {IBase} from "../model";
import {IRepository as IRepository} from "./repository.interface";

export default class BaseFileSystemRepository<T extends IBase>
  implements IRepository<T>
{
  private DATABASE_ENCODING: BufferEncoding = "utf8";
  private DATABASE_WRITE_OPTIONS: WriteFileOptions = this.DATABASE_ENCODING;

  private _db: {[id: number]: T} = {};

  constructor(private entityName: string, private databaseFile: string) {}

  /**
   * @returns {Promise<boolean>} TRUE if connection successful, FALSE otherwise.
   */
  async connect(): Promise<boolean> {
    console.log(`Connecting to ${path.resolve(this.databaseFile)}`);
    this.testDB();
    //TODO: remove Sync
    const dbContent = fs.readFileSync(
      this.databaseFile,
      this.DATABASE_ENCODING
    );
    this._db = JSON.parse(dbContent);
    return true;
  }

  getById(id: number): Promise<T> {
    return new Promise((resolve) => {
      resolve(this._db[id]);
    });
  }
  getAll(): Promise<ReadonlyArray<T>> {
    return new Promise((resolve) => {
      resolve(Object.values(this._db));
    });
  }
  async create(entity: T): Promise<T> {
    if (entity.id) {
      throw new ApplicationError(
        `${this.entityName} already has an id, try update it instead`
      );
    }
    const newEntity = {...entity};
    newEntity.id = await this.getNextId();
    this._db[newEntity.id] = newEntity;
    await this.overWriteDB(this._db);
    return newEntity;
  }

  async update(entity: T): Promise<T> {
    if (!entity.id) {
      throw new ApplicationError(
        `${this.entityName} does not have an id, try create it instead`
      );
    }

    let result = this._db[entity.id as number];
    // update person
    if (result.id == entity.id) {
      this._db[entity.id as number] = entity;
      await this.overWriteDB(this._db);
      console.log(`pos overWrite`);
    } else {
      throw new ApplicationError("The ID attribute can't be modified");
    }
    return entity;
  }

  async delete(id: number): Promise<boolean> {
    let result = this._db[id];
    //new
    if (result == null) {
      throw new ApplicationError(
        `There is no ${this.entityName} with ID: ${id}`
      );
    } else {
      delete this._db[id];
      return this.overWriteDB(this._db);
    }
  }

  /**
   * Test if the database exists. If not, create it.
   */
  private testDB() {
    if (!fs.existsSync(this.databaseFile)) {
      this.overWriteDB({});
    }
  }

  /**
   * @returns The next ID for a new entity.
   */
  getNextId(): Promise<number> {
    return new Promise((resolve) => {
      const unsorted: T[] = Object.values(this._db);
      //If there is no elements, the first ID is 1
      if (unsorted.length == 0) {
        resolve(1);
      }
      const sorted = unsorted.sort(
        (a, b) => (a.id as number) - (b.id as number)
      );
      resolve((sorted[sorted.length - 1].id as number) + 1);
    });
  }

  /**
   * Overwrites the entire database with the given data.
   */
  private async overWriteDB(db: any): Promise<boolean> {
    fs.writeFileSync(
      this.databaseFile,
      JSON.stringify(db),
      this.DATABASE_WRITE_OPTIONS
    );
    return true;
  }
}
