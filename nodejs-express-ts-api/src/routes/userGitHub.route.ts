import express from "express";
import {getUser} from "../controllers";

const UserGitHubRouter = express.Router();

// User GitHub
UserGitHubRouter.get("/", getUser);

export {UserGitHubRouter};
