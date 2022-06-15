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
        } catch (e) {
          done(e as Error);
        }
        if (user == null) {
          return done(new ApplicationError(`JWT not valid`));
        } else {
          return done(null, user);
        }
      }
    )
  );
}
