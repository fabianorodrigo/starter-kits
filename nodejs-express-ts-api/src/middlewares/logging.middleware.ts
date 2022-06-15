import {Request, Response, NextFunction} from "express";

/**
 * Middleware customizado para logar as requisições e exercitar a lógica de obter query strings,
 * path params, cookies e headers
 *
 * @param req Request
 * @param res Response
 * @param next next
 */
export function logging(req: Request, res: Response, next: NextFunction) {
  // query string
  const userNameQueryString = req.query.username;
  // path param
  console.log(req.params, "<===========");
  const id = req.params.id;
  // headers request
  let headersRequest = "";
  if (req.headers) {
    for (const k of Object.keys(req.headers)) {
      headersRequest += `${k}: ${req.headers[k]} | `;
    }
  }
  // cookies request
  let cookiesRequest = "";
  if (req.cookies) {
    for (const k of Object.keys(req.cookies)) {
      cookiesRequest += `${k}: ${req.cookies[k]} | `;
    }
  }

  const dateTime = new Date().toISOString();
  console.log(
    `${dateTime}: ${req.method} ${req.url} - userNameQS: ${userNameQueryString} - idPersonPP: ${id}`
  );
  console.log(`${dateTime}: Request HEADERS ${headersRequest}`);
  console.log(`${dateTime}: Request COOKIES ${cookiesRequest}`);
  next();
  console.log(
    `${new Date().toISOString()}: Response HEADERS ${JSON.stringify(
      res.getHeaders()
    )}`
  );
}
