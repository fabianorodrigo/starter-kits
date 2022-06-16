import passport from "passport";
import PassportBearer from "passport-http-bearer";
import {ApplicationError} from "../customErrors/ApplicationError";
import {verifyJWT} from "./token";

export function initAuthBearerStrategy() {
  passport.use(
    new PassportBearer.Strategy(
      async (
        jwt: string,
        done: (err: Error | null, result?: {username: string}) => void
      ) => {
        let user;
        try {
          user = await verifyJWT(jwt);
          return done(null, user);
        } catch (e) {
          done(e as Error);
        }
      }
    )
  );
}
