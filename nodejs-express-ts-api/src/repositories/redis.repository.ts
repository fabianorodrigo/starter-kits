import {createHash} from "crypto";
import path from "path";
import {createClient} from "redis";
import {ApplicationError} from "../customErrors/ApplicationError";
import {IBase} from "../model";
import {IRepository} from "./repository.interface";

export class RedisRepository<T extends IBase> implements IRepository<T> {
  private DATABASE_ENCODING: BufferEncoding = "utf8";
  private _db: any;

  //não é um singleton, mas é uma única intância por connection string + prefixo
  private static _instances: {
    [connectionStringAndPrefix: string]: RedisRepository<any>;
  } = {};

  private constructor(
    private prefix: string,
    private connectionString: string
  ) {}

  getNextId(): Promise<number> {
    throw new Error("Method not implemented.");
  }

  public static getInstance<T>(
    prefix: string,
    connectionString: string
  ): RedisRepository<T> {
    if (!this._instances[connectionString.concat("|", prefix)]) {
      this._instances[connectionString.concat("|", prefix)] =
        new RedisRepository<T>(prefix, connectionString);
    }
    return this._instances[connectionString.concat("|", prefix)];
  }

  /**
   * @returns {Promise<boolean>} TRUE if connection successful, FALSE otherwise.
   */
  async connect(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      console.log(`Connecting to ${path.resolve(this.connectionString)}`);
      this.testDB();

      this._db = createClient({url: process.env.REDIS_URL});
      this._db.on("error", (err: Error) => {
        console.log(err);
      });
      await this._db.connect();
      resolve(true);
    });
  }

  getById(id: number): Promise<T> {
    return this._db.get(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getByAttribute(attribute: string, value: unknown): Promise<readonly T[]> {
    throw new ApplicationError(`Not implemented`);
  }

  getAll(): Promise<ReadonlyArray<T>> {
    throw new ApplicationError(`Not implemented`);
  }
  async create(entity: T): Promise<T> {
    const createResult = this._db.set(entity.id, "");
    console.log("createResult==>", createResult);
    return createResult;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(entity: T): Promise<T> {
    throw new ApplicationError(`Not implemented`);
  }
  // if (!entity.id) {
  //   throw new ApplicationError(
  //     `${this.prefix} does not have an id, try create it instead`
  //   );
  // }

  // const result = this._db[entity.id as number];
  // // update person
  // if (result.id == entity.id) {
  //   this._db[entity.id as number] = entity;
  //   await this.overWriteDB(this._db);
  // } else {
  //   throw new ApplicationError("The ID attribute can't be modified");
  // }
  // return entity;

  async delete(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      console.log("redis.delete", this._db.del(id));
      resolve(true);
    });
  }

  /**
   * Test if the database exists. If not, create it.
   */
  private testDB() {
    //TODO: testar se redis no ar
  }
}
