import {NextFunction, Request, Response} from "express";
import {UserController} from "../controllers";
import {AuthorizationError} from "../customErrors";

/**
 * Middleware que recebe o access token e refresh token e retorna um novo access token renovado
 *
 * @param req Request
 * @param res Response
 * @param next next
 */
export async function refreshTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // query string
  const {refreshToken} = req.body;
  try {
    const userCtl = new UserController();
    const id = parseInt(await userCtl.verifyRefreshToken(refreshToken));
    await userCtl.invalidateRefreshToken(refreshToken);
    req.user = await userCtl.getUserById(id);
    return next();
  } catch (e: any) {
    if (e instanceof AuthorizationError) {
      res.status(401).send({message: e.message});
    } else {
      res.status(500).send({message: e.message});
    }
  }
}
