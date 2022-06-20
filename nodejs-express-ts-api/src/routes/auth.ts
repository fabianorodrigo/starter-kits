import express from "express";
import passport from "passport";
import {UserController} from "../controllers";
import {
  authBearerStrategyMiddleware,
  authLocalStrategyMiddleware,
  authTwitterStrategyMiddleware,
  refreshTokenMiddleware,
} from "../middlewares";

const AuthRouter = express.Router();
const userCtl = new UserController();

// ********************************* Local (user/password) ******************************** /
AuthRouter.post(
  "/login/local",
  authLocalStrategyMiddleware,
  userCtl.login.bind(userCtl)
);

// **************************************** Bearer **************************************** /
//logout
AuthRouter.post(
  "/logout",
  [refreshTokenMiddleware, authBearerStrategyMiddleware],
  userCtl.logout.bind(userCtl)
);
//refresh dos tokens
AuthRouter.post(
  "/refreshToken",
  refreshTokenMiddleware,
  userCtl.login.bind(userCtl)
);

// **************************************** Twitter **************************************** /
AuthRouter.get("/login/twitter", authTwitterStrategyMiddleware);
AuthRouter.get(
  "/oauth/callback/twitter",
  passport.authenticate("twitter", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/home");
  }
);

export {AuthRouter};
