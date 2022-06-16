import {Request, Response, NextFunction} from "express";
import passport from "passport";
import {ApplicationError} from "../customErrors/ApplicationError";

/**
 * Middleware para fazer o tratamento adequado de autenticação do usuário
 *
 * @param req Request
 * @param res Response
 * @param next next
 */
export function authLocalStrategyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate("local", {session: false}, (err, user) => {
    if (err instanceof ApplicationError) {
      return res.status(401).json({message: err.message});
    } else if (err) {
      return res.status(500).json({message: err.message});
    }
    if (!user) {
      return res.status(401).json();
    }
    req.user = user;
    return next();
  })(req, res, next);
}
