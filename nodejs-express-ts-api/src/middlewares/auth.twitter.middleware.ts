import {NextFunction, Request, Response} from "express";
import passport from "passport";
import {ITwitterStrategyResult} from "../auth/twitter.strategy";
import {handleRequestErrors} from "../customErrors";

/**
 * Middleware para fazer o tratamento adequado de autenticação
 * via estratégia Twitter
 *
 * @param req Request
 * @param res Response
 * @param next next
 */
export function authTwitterStrategyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "twitter",
    {failureRedirect: "/login", failureMessage: true},
    (err, user: ITwitterStrategyResult) => {
      // console.log(
      //   ` =================== PASSEI no MiDDLEware ==================================== `
      // );
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
