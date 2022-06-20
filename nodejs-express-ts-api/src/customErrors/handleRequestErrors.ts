import {Request, Response} from "express";
import {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";
import {ApplicationError, AuthorizationError} from ".";

/**
 * Handle errors propertly when they occur in a request based on the type of Error
 * @param err Error
 * @param req Request
 * @param res Response
 * @returns {boolean} TRUE if the error was handled, FALSE otherwise
 */
export function handleRequestErrors(
  err: Error,
  req: Request,
  res: Response
): boolean {
  if (!err) return false;
  if (err instanceof TokenExpiredError) {
    res.status(401).json({message: err.message, expiration: err.expiredAt});
  } else if (
    err instanceof JsonWebTokenError ||
    err instanceof AuthorizationError
  ) {
    res.status(401).json({message: err.message});
  } else if (err instanceof ApplicationError) {
    res.status(400).json({message: err.message});
  } else if (err) {
    // Erro 500 não deve ir com a mensagem por questões de segurança
    res.status(500).json({
      message: `An unexpected error ocurred on the server: ${err.message}`,
    });
  }
  return true;
}
