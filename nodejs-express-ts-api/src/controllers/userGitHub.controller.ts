import {Request, Response} from "express";
import {UserDTO} from "../model";
import {getGithubUserData} from "../services/user.service";

const cache: {[key: string]: UserDTO} = {};

export async function getUserGithub(req: Request, res: Response) {
  let name = req.query["username"] as string;
  if (!name) {
    name = "nodejs";
  }
  console.log("name", name);
  if (!cache.hasOwnProperty(name)) {
    console.log(`fetching: ${name}`);
    cache[name] = await getGithubUserData(name);
  } else {
    console.log(`use of cached data: ${name}`);
  }
  res.json(cache[name]);
}
