import passport from "passport";
import PassportBearer from "passport-http-bearer";
import {AuthorizationError} from "../customErrors";
import {RedisService} from "../services";
import {verifyJWT} from "./token";

/**
 * Singleton instance of RedisService
 */
const redisService = RedisService.getInstance(
  process.env.REDIS_BLOCKED_TOKENS_PREFIX as string,
  process.env.REDIS_URL as string
);
redisService.connect();

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
          if ((await redisService.keyExists(jwt)) > 0) {
            throw new AuthorizationError(`JWT blocked by logout`);
          }
          user = await verifyJWT(jwt);
          return done(null, {username: user.username, accessToken: jwt});
        } catch (e) {
          done(e as Error);
        }
      }
    )
  );
}
