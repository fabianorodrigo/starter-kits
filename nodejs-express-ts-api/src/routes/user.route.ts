import express from "express";
import {UserController} from "../controllers";
import {
  authBearerlStrategyMiddleware,
  authLocalStrategyMiddleware,
  refreshTokenMiddleware,
} from "../middlewares";

const UserRouter = express.Router();

// User
const userCtl = new UserController();
UserRouter.post("/", authLocalStrategyMiddleware, userCtl.login.bind(userCtl));
//logout
UserRouter.post(
  "/logout",
  [refreshTokenMiddleware, authBearerlStrategyMiddleware],
  userCtl.logout.bind(userCtl)
);
//refresh dos tokens
UserRouter.post(
  "/refreshToken",
  refreshTokenMiddleware,
  userCtl.login.bind(userCtl)
);

export {UserRouter};
