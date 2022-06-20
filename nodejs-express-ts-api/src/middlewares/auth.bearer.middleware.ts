import {NextFunction, Request, Response} from "express";
import passport from "passport";
import {IBearerStrategyResult} from "../auth";
import {handleRequestErrors} from "../customErrors";

/**
 * Middleware para fazer o tratamento adequado de autenticação
 * via estratégia Bearer (token)
 *
 * @param req Request
 * @param res Response
 * @param next next
 */
export function authBearerStrategyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "bearer",
    {session: false},
    (err, user: IBearerStrategyResult) => {
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
