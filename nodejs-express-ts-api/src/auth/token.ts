import {IUser} from "../model";
import jwt, {Secret, JwtPayload} from "jsonwebtoken";
import {UserController} from "../controllers";
import crypto from "crypto";
import {RedisService} from "../services";
import {AuthorizationError} from "../customErrors";
import {ILocalStrategyResult} from "./local.strategy";

/**
 * Singleton instance of RedisService
 */
const redisServiceRefreshTokens = RedisService.getInstance(
  process.env.REDIS_ALLOWED_TOKENS_PREFIX as string,
  process.env.REDIS_URL as string
);
redisServiceRefreshTokens.connect();

/**
 * Create a valid JWT token for the user
 * @param user user to be created
 * @returns
 */
export function createJWT(user: ILocalStrategyResult): string {
  const payload = {
    id: user.id,
  };
  return jwt.sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_EXPIRATION_TIME || "1m",
  });
}

/**
 * Create a opaque token (random string)
 * @returns 24 bytes randomic string
 */
export async function createOpaqueToken(user: ILocalStrategyResult) {
  const opaqueToken = crypto.randomBytes(24).toString("hex");
  const exp = new Date().getTime() + 24 * 60 * 60 * 1000;
  await redisServiceRefreshTokens.setSingleValue(
    opaqueToken,
    (user.id as number).toString(),
    exp
  );
  return opaqueToken;
}

/**
 * Check if the token is valid and returns a instance of the user related to it
 * @param token JWT token
 * @returns
 */
export function verifyJWT(token: string): Promise<IUser> {
  const userController = new UserController();
  const payload = jwt.verify(token, process.env.JWT_SECRET as Secret);
  return userController.getUserById((payload as JwtPayload).id as number);
}

/**
 * Verify if the token is valid and returns the userId related to it
 *
 * @param token refresh token to be checked
 * @returns User ID
 */
export async function verifyRefreshToken(token: string): Promise<string> {
  if (!token) throw new AuthorizationError(`Refresh token no sent`);
  const id = await redisServiceRefreshTokens.getSingleValue(token);
  if (!id) throw new AuthorizationError(`Refresh token not valid`);
  return id;
}

/**
 * Invalidates the refresh token deleting it from Redis
 *
 * @param token refresh token to be invalidated
 * @returns
 */
export async function invalidateRefreshToken(token: string): Promise<boolean> {
  return (await redisServiceRefreshTokens.delete(token)) > 0;
}
