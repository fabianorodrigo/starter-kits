import express from "express";
import {GithubController} from "../controllers";

const UserGitHubRouter = express.Router();

const githubCtl = new GithubController();

// User GitHub
UserGitHubRouter.get("/", githubCtl.getUser.bind(githubCtl));

export {UserGitHubRouter};
