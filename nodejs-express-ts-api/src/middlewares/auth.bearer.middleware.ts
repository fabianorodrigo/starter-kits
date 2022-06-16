import {NextFunction, Request, Response} from "express";
import {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";
import passport from "passport";
import {IBearerStrategyResult} from "../auth";
import {AuthorizationError} from "../customErrors";

/**
 * Middleware para fazer o tratamento adequado de autenticação
 * via estratégia Bearer (token)
 *
 * @param req Request
 * @param res Response
 * @param next next
 */
export function authBearerlStrategyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "bearer",
    {session: false},
    (err, user: IBearerStrategyResult) => {
      if (err instanceof TokenExpiredError) {
        return res
          .status(401)
          .json({message: err.message, expiration: err.expiredAt});
      } else if (
        err instanceof JsonWebTokenError ||
        err instanceof AuthorizationError
      ) {
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
