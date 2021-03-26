import { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";

export function getIndex(req: Request, res: Response) {
  console.log("----------------*-----------------");
  console.log(req.user);
  console.log("----------------*-----------------");

  res.render("index", { user: req.user });
}

export function handle404(req: Request, res: Response, next: NextFunction) {
  next(createError("404"));
}

export function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.message = err.message;
  res.locals.error = process.env.ENV === "dev" ? err : {};
  res.status(err.status || 500);
  res.render("error");
}
