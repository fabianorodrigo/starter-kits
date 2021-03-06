import {IAttributeFilter} from "./attributeFilter.interface";
import fs, {promises as fsPromises, WriteFileOptions} from "fs";
import path from "path";
import {NotFoundError} from "../customErrors";
import {ApplicationError} from "../customErrors/ApplicationError";
import {IBase} from "../model";
import {IRepository} from "./repository.interface";

export class FileSystemRepository<T extends IBase> implements IRepository<T> {
  private DATABASE_ENCODING: BufferEncoding = "utf8";
  private DATABASE_WRITE_OPTIONS: WriteFileOptions = this.DATABASE_ENCODING;

  private _db: {[id: number]: T} = {};

  //não é um singleton, mas é uma única intância por database file
  private static _instances: {
    [databaseFile: string]: FileSystemRepository<any>;
  } = {};

  private constructor(
    private entityName: string,
    private databaseFile: string
  ) {}

  public static getInstance<T>(
    entityName: string,
    databaseFile: string
  ): FileSystemRepository<T> {
    if (!this._instances[databaseFile]) {
      this._instances[databaseFile] = new FileSystemRepository<T>(
        entityName,
        databaseFile
      );
    }
    return this._instances[databaseFile];
  }

  /**
   * @returns {Promise<boolean>} TRUE if connection successful, FALSE otherwise.
   */
  async connect(): Promise<boolean> {
    console.log(`Connecting to ${path.resolve(this.databaseFile)}`);
    this.testDB();
    const dbContent = await fsPromises.readFile(
      this.databaseFile,
      this.DATABASE_ENCODING
    );
    this._db = JSON.parse(dbContent);
    return true;
  }

  getById(id: number): Promise<T> {
    return new Promise((resolve, reject) => {
      if (this._db[id]) {
        resolve(this._db[id]);
      } else {
        reject(
          new NotFoundError(`${this.entityName} with ID: ${id} does not exist`)
        );
      }
    });
  }
  getByAttribute(filter: IAttributeFilter): Promise<ReadonlyArray<T>> {
    return new Promise((resolve) => {
      resolve(
        Object.values(this._db).filter(
          (row) => row[filter.attribute] == filter.value
        )
      );
    });
  }
  getByAttributesAND(filter: IAttributeFilter[]): Promise<ReadonlyArray<T>> {
    return new Promise((resolve) => {
      resolve(
        Object.values(this._db).filter((row) =>
          filter.every((f) => row[f.attribute] == f.value)
        )
      );
    });
  }
  getByAttributesOR(filter: IAttributeFilter[]): Promise<ReadonlyArray<T>> {
    return new Promise((resolve) => {
      resolve(
        Object.values(this._db).filter((row) =>
          filter.some((f) => row[f.attribute] == f.value)
        )
      );
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

    const result = this._db[entity.id as number];
    // update person
    if (result.id == entity.id) {
      this._db[entity.id as number] = entity;
      await this.overWriteDB(this._db);
    } else {
      throw new ApplicationError("The ID attribute can't be modified");
    }
    return entity;
  }

  async delete(id: number): Promise<boolean> {
    const result = this._db[id];
    //new
    if (result == null) {
      throw new NotFoundError(`There is no ${this.entityName} with ID: ${id}`);
    } else {
      delete this._db[id];
      return this.overWriteDB(this._db);
    }
  }

  /**
   * Test if the database exists. If not, create it.
   */
  private testDB() {
    fs;
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
  private async overWriteDB(db: unknown): Promise<boolean> {
    /**
     * Poderia ser utilizado do fsPromises.writeFile para escrever o arquivo, mas dado o trecho abaixo tirado da documentação
     * optou-se por uma escrita síncrona
     * It is unsafe to use fsPromises.writeFile() multiple times on the same file without waiting for the promise to be settled.
     */
    fs.writeFileSync(
      this.databaseFile,
      JSON.stringify(db),
      this.DATABASE_WRITE_OPTIONS
    );
    return true;
  }
}
