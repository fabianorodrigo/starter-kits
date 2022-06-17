export class RedisServiceStub {
  public prefix!: string;
  public connectionString!: string;

  private _dados: {[key: string]: string} = {};
  /**
   * @returns always TRUE
   */
  isConnected(): boolean {
    return true;
  }

  /**
   * @returns {Promise<boolean>} always TRUE
   */
  async connect(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      resolve(true);
    });
  }

  async disconnect(): Promise<void> {
    return new Promise<void>(async (resolve) => {
      resolve();
    });
  }

  /**
   * Verifies if the key already exists
   *
   * @param key Key which existence will be checked
   * @returns ?
   */
  async keyExists(key: string): Promise<number> {
    return new Promise<number>(async (resolve) => {
      if (key.startsWith("testing")) {
        resolve(0);
      } else {
        resolve(1);
      }
    });
  }

  /**
   * Read value associated with the {key}
   *
   * @param key key which value wants to get
   * @returns value associated with the {key}
   */
  async getSingleValue(key: string): Promise<string | null> {
    return new Promise<string>(async (resolve) => {
      resolve(this._dados[key]);
    });
  }

  /**

   */
  async setSingleValue(
    key: string,
    value: string,
    expiresAt?: number
  ): Promise<boolean> {
    this._dados[key] = value;
    return true;
  }

  async getObjectValue(key: string): Promise<{[key: string]: string}> {
    const resultado: {[key: string]: string} = {};
    return new Promise<{[key: string]: string}>(async (resolve) => {
      resultado[key] = this._dados[key];
      resolve(resultado);
    });
  }

  async setObjectValue(
    key: string,
    value: {[key: string]: string}
  ): Promise<boolean> {
    this._dados[key] = JSON.stringify(value);
    return true;
  }

  /**

   */
  async delete(key: string): Promise<number> {
    return new Promise<number>(async (resolve) => {
      delete this._dados[key];
      resolve(1);
    });
  }
}
