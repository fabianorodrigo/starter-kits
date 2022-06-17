import {createClient} from "redis";
import {RedisClient} from "./redisclient.type";

export class RedisService {
  private _db!: RedisClient;

  private constructor(
    private prefix: string,
    private connectionString: string
  ) {}

  //não é um singleton, mas é uma única intância por connection string + prefixo
  private static _instances: {
    [connectionStringAndPrefix: string]: RedisService;
  } = {};

  /**
   *
   * @param prefix prefixo do redis
   * @param connectionString connection string to Redis
   * @returns An instance of RedisRepository with the given {prefix} and {connectionString}
   */
  public static getInstance(
    prefix: string,
    connectionString: string
  ): RedisService {
    const key = `${connectionString}|${prefix}`;
    if (!this._instances[key]) {
      this._instances[key] = new RedisService(prefix, connectionString);
    }
    return this._instances[key];
  }

  /**
   * Disconnect all stablished connections
   */
  public static async disconnectAllInstances() {
    for (const instance of Object.values(this._instances)) {
      await instance.disconnect();
    }
  }

  /**
   * @returns TRUE if the instance is already connected with Redis Server
   */
  isConnected(): boolean {
    return this._db.isOpen;
  }

  /**
   * @returns {Promise<boolean>} TRUE if connection successful, FALSE otherwise.
   */
  async connect(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      if (this._db && this._db.isOpen) {
        resolve(true);
      } else {
        console.log(`Connecting to ${this.connectionString}`);

        if (!this._db) {
          this._db = createClient({
            url: this.connectionString,
            name: this.prefix,
          });
          this._db.on("error", async (err: Error) => {
            console.log(`Redis Client error`, err);
            await this._db.disconnect();
            reject(err);
          });
        }
        await this._db.connect();
        resolve(true);
      }
    });
  }

  /**
   * Disconnnects from the Redis server
   */
  async disconnect(): Promise<void> {
    return this._db.disconnect();
  }

  /**
   * Verifies if the key already exists
   *
   * @param key Key which existence will be checked
   * @returns ?
   */
  async keyExists(key: string): Promise<number> {
    return this._db.exists(key);
  }

  /**
   * Read value associated with the {key}
   *
   * @param key key which value wants to get
   * @returns value associated with the {key}
   */
  getSingleValue(key: string): Promise<string | null> {
    return this._db.get(key);
  }

  /**
   * Sets the value associated with the {key}. If {expiresAt} is not null,
   * the key is set to expire at {expiresAt}
   *
   * @param key key under which the value will be indexed
   */
  async setSingleValue(
    key: string,
    value: string,
    expiresAt?: number
  ): Promise<boolean> {
    await this._db.set(key, value);
    if (expiresAt) {
      await this._db.expireAt(key, expiresAt);
    }
    return true;
  }

  getObjectValue(key: string): Promise<{[key: string]: string}> {
    return this._db.hGetAll(key);
  }

  /**
   * Indexes the object properties under {key}
   *
   * @param key key under which the object's attributes values will be indexed
   * @param value A object with attributes values to be indexed
   * @returns {Promise<boolean>} TRUE if successful, FALSE otherwise.
   */
  async setObjectValue(
    key: string,
    value: {[key: string]: string}
  ): Promise<boolean> {
    const attributes = Object.keys(value);
    for (const attribute of attributes) {
      await this._db.hSet(key, attribute, value[attribute]);
    }
    return true;
  }

  /**
   * Deletes the key from Redis server
   *
   * @param key Key to be deleted
   * @returns ?
   */
  async delete(key: string): Promise<number> {
    return this._db.del(key);
  }
}
