import express from "express";
import passport from "passport";
import {UserController} from "../controllers";

const UserRouter = express.Router();

// User
const userCtl = new UserController();
UserRouter.post(
  "/",
  passport.authenticate("local", {session: false}),
  userCtl.login.bind(userCtl)
);

export {UserRouter};
