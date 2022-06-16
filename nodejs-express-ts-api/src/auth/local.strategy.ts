import passport from "passport";
import PassportLocal from "passport-local";
import {ApplicationError} from "../customErrors/ApplicationError";
import {UserController} from "./../controllers/";

export interface ILocalStrategyResult {
  id: number;
  username: string;
}

export function initAuthLocalStrategy() {
  const userController = new UserController();

  passport.use(
    new PassportLocal.Strategy(
      {
        usernameField: "username",
        passwordField: "password",
        session: false,
      },
      async (
        username: string,
        password: string,
        done: (err: Error | null, result?: ILocalStrategyResult) => void
      ) => {
        const user = await userController.authUser(username, password);
        if (user == null) {
          return done(new ApplicationError(`User and password not found`));
        } else {
          return done(null, {id: user.id as number, username: user.username});
        }
      }
    )
  );
}
