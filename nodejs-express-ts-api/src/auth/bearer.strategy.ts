import passport from "passport";
import PassportBearer from "passport-http-bearer";
import {verifyJWT} from "./token";

export interface IBearerStrategyResult {
  username: string;
  accessToken: string;
}

export function initAuthBearerStrategy() {
  passport.use(
    new PassportBearer.Strategy(
      async (
        jwt: string,
        done: (err: Error | null, result?: IBearerStrategyResult) => void
      ) => {
        let user;
        try {
          user = await verifyJWT(jwt);
          return done(null, {username: user.username, accessToken: jwt});
        } catch (e) {
          done(e as Error);
        }
      }
    )
  );
}
