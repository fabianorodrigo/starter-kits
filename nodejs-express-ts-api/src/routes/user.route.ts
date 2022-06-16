import express from "express";
import {UserController} from "../controllers";
import {
  authBearerlStrategyMiddleware,
  authLocalStrategyMiddleware,
} from "../middlewares";

const UserRouter = express.Router();

// User
const userCtl = new UserController();
UserRouter.post("/", authLocalStrategyMiddleware, userCtl.login.bind(userCtl));
UserRouter.get(
  "/logout",
  authBearerlStrategyMiddleware,
  userCtl.logout.bind(userCtl)
);

export {UserRouter};
