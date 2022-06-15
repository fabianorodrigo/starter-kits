import express from "express";
import {getUserGithub} from "../controllers";

const UserGitHubRouter = express.Router();

// User GitHub
UserGitHubRouter.get("/", getUserGithub);

export {UserGitHubRouter};
