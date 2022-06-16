import {Request, Response, NextFunction} from "express";
import passport from "passport";
import {ILocalStrategyResult} from "../auth";
import {ApplicationError} from "../customErrors/ApplicationError";

/**
 * Middleware para fazer o tratamento adequado de autenticação
 * via estratégia Local (usuário e senha)
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
  passport.authenticate(
    "local",
    {session: false},
    (err, user: ILocalStrategyResult) => {
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
    }
  )(req, res, next);
}
