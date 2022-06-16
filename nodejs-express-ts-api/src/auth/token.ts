import {IUser} from "../model";
import jwt, {Secret, JwtPayload} from "jsonwebtoken";
import {UserController} from "../controllers";

/**
 * Create a valid JWT token for the user
 * @param user user to be created
 * @returns
 */
export function createJWT(user: IUser): string {
  const payload = {
    id: user.id,
  };
  return jwt.sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_EXPIRATION_TIME || "1m",
  });
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
