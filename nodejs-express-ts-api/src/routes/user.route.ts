import express from "express";
import {UserController} from "../controllers";
import {authLocalStrategyMiddleware} from "../middlewares";

const UserRouter = express.Router();

// User
const userCtl = new UserController();
UserRouter.post("/", authLocalStrategyMiddleware, userCtl.login.bind(userCtl));

export {UserRouter};
