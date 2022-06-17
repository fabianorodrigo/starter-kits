import passport from "passport";
import PassportBearer from "passport-http-bearer";
import {UserController} from "../controllers";
import {AuthorizationError} from "../customErrors";
import {TokenFactory} from "./token";

export interface IBearerStrategyResult {
  username: string;
  accessToken: string;
}

export async function initAuthBearerStrategy() {
  const userCtl = new UserController();
  passport.use(
    new PassportBearer.Strategy(
      async (
        jwt: string,
        done: (err: Error | null, result?: IBearerStrategyResult) => void
      ) => {
        // console.log(
        //   ` =================== PASSEI AQUI NO VERIFICATION CALLBACK ==================================== `
        // );
        let user;
        try {
          if (
            (await TokenFactory.getRedisBlockedJWTTokens().keyExists(jwt)) > 0
          ) {
            throw new AuthorizationError(`JWT blocked by logout`);
          }
          user = await userCtl.verifyJWT(jwt);
          return done(null, {username: user.username, accessToken: jwt});
        } catch (e) {
          return done(e as Error);
        }
      }
    )
  );
}
