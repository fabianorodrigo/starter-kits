import crypto from "crypto";
import jwt, {JwtPayload, Secret} from "jsonwebtoken";
import {UserController} from "../controllers";
import {AuthorizationError} from "../customErrors";
import {IUser} from "../model";
import {RedisService} from "../services";
import {ILocalStrategyResult} from "./local.strategy";

export class TokenFactory {
  constructor(private userController: UserController) {}
  /**
   * Create a valid JWT token for the user
   * @param user user to be created
   * @returns
   */
  createJWT(user: ILocalStrategyResult): string {
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
  async createOpaqueToken(user: ILocalStrategyResult) {
    const opaqueToken = crypto.randomBytes(24).toString("hex");
    const exp = new Date().getTime() + 24 * 60 * 60 * 1000;
    await TokenFactory.getRedisAllowedRefreshTokens().setSingleValue(
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
  verifyJWT(token: string): Promise<IUser> {
    const payload = jwt.verify(token, process.env.JWT_SECRET as Secret);
    return this.userController.getUserById(
      (payload as JwtPayload).id as number
    );
  }

  /**
   * Verify if the token is valid and returns the userId related to it
   *
   * @param token refresh token to be checked
   * @returns User ID
   */
  async verifyRefreshToken(token: string): Promise<string> {
    if (!token) throw new AuthorizationError(`Refresh token no sent`);
    const id = await TokenFactory.getRedisAllowedRefreshTokens().getSingleValue(
      token
    );
    if (!id) throw new AuthorizationError(`Refresh token not valid`);
    return id;
  }

  /**
   * Invalidates the refresh token deleting it from Redis
   *
   * @param token refresh token to be invalidated
   * @returns
   */
  async invalidateRefreshToken(token: string): Promise<boolean> {
    return (
      (await TokenFactory.getRedisAllowedRefreshTokens().delete(token)) > 0
    );
  }

  /**
   * @returns Instance of RedisService to handle JWT tokens blocked by logout
   */
  static getRedisBlockedJWTTokens(): RedisService {
    return RedisService.getInstance(
      process.env.REDIS_BLOCKED_TOKENS_PREFIX as string,
      process.env.REDIS_URL as string
    );
  }

  /**
   * @returns Instance of RedisService to handle Refresh Tokens allowed to be used
   */
  static getRedisAllowedRefreshTokens(): RedisService {
    return RedisService.getInstance(
      process.env.REDIS_ALLOWED_TOKENS_PREFIX as string,
      process.env.REDIS_URL as string
    );
  }
}
