import {Request, Response} from "express";
import {
  createJWT,
  createOpaqueToken,
  IBearerStrategyResult,
  ILocalStrategyResult,
} from "../auth";
import {ApplicationError} from "../customErrors/ApplicationError";
import {IUser} from "../model";
import {FileSystemRepository} from "../repositories";
import {RedisService} from "../services";
import {BaseController} from "./base.controller";

const DATABASE_PATH = `./data/user.json`;

export class UserController extends BaseController<IUser> {
  constructor() {
    super(`User`, FileSystemRepository.getInstance("User", DATABASE_PATH));
    this.repository.connect();
    this._redisServiceBlockedJWT = RedisService.getInstance(
      process.env.REDIS_BLOCKED_TOKENS_PREFIX as string,
      process.env.REDIS_URL as string
    );
    this._redisServiceBlockedJWT.connect();
  }

  /**
   * Reference to Singleton instance of RedisService
   */
  private _redisServiceBlockedJWT: RedisService;

  /**
   * If during POST or PUT, the entity has others attributes than these, it will throw an error.
   */
  protected allowedAttributes: ReadonlyArray<string> = ["username", "password"];
  /**
   * If during POST or PUT, the entity miss these attributes, it will throw an error.
   */
  protected requiredAttributes: ReadonlyArray<string> = [
    "username",
    "password",
  ];

  async login(req: Request, res: Response): Promise<void> {
    const user: ILocalStrategyResult = req.user as ILocalStrategyResult;
    try {
      if (req.user) {
        const accessToken = createJWT(user);
        const refreshToken = await createOpaqueToken(user);
        res.set("Authorization", `Bearer ${accessToken}`);
        res.status(200).send({refreshToken});
      } else {
        res.status(401).send();
      }
    } catch (e: any) {
      res.status(401).send({message: e.message});
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      //TODO: implementar o logout jogando o token para uma blacklist
      const jwtToken = (req.user as IBearerStrategyResult).accessToken;
      await this._redisServiceBlockedJWT.setSingleValue(jwtToken, "");
      console.log(jwtToken);
      res.status(204).send();
    } catch (e: any) {
      res.status(500).json({error: e.message});
    }
  }

  /**
   * Authenticates the user with password
   * @param username username of the user to get
   * @param password password of the user to get
   * @returns The object user if is found one with the username and password informed
   */
  authUser(username: string, password: string): Promise<IUser | null> {
    return new Promise<IUser | null>(async (resolve) => {
      const users = await this.repository.getByAttribute("username", username);
      if (users.length == 0 || users[0].password != password) {
        resolve(null);
      } else {
        resolve(users[0]);
      }
    });
  }

  /**
   * Get a user by id
   * @param id identifier of the user to get
   * @returns
   */
  getUserById(id: number): Promise<IUser> {
    return this.readOneEntity(id);
  }

  /**
   * Implements logic to get one person from repository
   * @param {number} id identifier of the person to get
   * @returns The Person with the given id
   */
  protected async readOneEntity(id: number): Promise<IUser> {
    return this.repository.getById(id);
  }

  /**
   * Must implement the logic to read entities from the repository  accordingly with the filter.
   * @param req Request from client
   */
  protected readEntities(req: Request): Promise<ReadonlyArray<IUser>> {
    if (req.body.filter && req.body.filter.attribute) {
      const k = req.body.filter.attribute;
      const v = req.body.filter.value;
      return new Promise(async (resolve) => {
        const rows = await this.repository.getAll();
        if (rows.length == 0) {
          resolve([]);
        }
        type IUserKey = keyof typeof rows[0];
        resolve(
          rows.filter((row) => {
            return (
              (row[k as IUserKey] as string)
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
   * @param {Request<IUser>} req Expected to have a IUser in the body
   */
  protected async createEntity(req: Request<IUser>): Promise<IUser> {
    if (req.body.id) {
      throw new ApplicationError("Person's already has an id, use PUT instead");
    }
    return this.repository.create(req.body);
  }

  /**
   * Updates a person's registry in the database.
   * @param {Request<IUser>} req Expected to have a IUser in the body
   */
  protected async updateEntity(req: Request<IUser>): Promise<IUser> {
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
