import {Request, Response} from "express";
import {UserDTO} from "../model";
import {GithubService} from "../services";

const cache: {[key: string]: UserDTO} = {};

export class GithubController {
  private _githubService: GithubService;

  constructor() {
    this._githubService = new GithubService();
  }

  async getUser(req: Request, res: Response) {
    let name = req.query["username"] as string;
    if (!name) {
      name = "nodejs";
    }
    console.log("name", name);
    if (!cache.hasOwnProperty(name)) {
      console.log(`fetching: ${name}`);
      cache[name] = await this._githubService.getUserData(name);
    } else {
      console.log(`use of cached data: ${name}`);
    }
    res.json(cache[name]);
  }
}
