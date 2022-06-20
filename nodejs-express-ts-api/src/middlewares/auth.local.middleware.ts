import {NextFunction, Request, Response} from "express";
import passport from "passport";
import {ILocalStrategyResult} from "../auth";
import {handleRequestErrors} from "../customErrors";

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
      //if the error was properly handled, returns
      if (handleRequestErrors(err, req, res)) {
        return;
      }
      if (!user) {
        return res.status(401).json();
      }
      req.user = user;
      return next();
    }
  )(req, res, next);
}
