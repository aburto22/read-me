import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { validationResult } from "express-validator";

dotenv.config();

const clientUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
const loginRedirectUrl = `${clientUrl}/login-error`;

export const checkValidatorErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): NextFunction | void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map((error) => `${error.param}: ${error.msg}`)
      .join(", ");
    const err: IServerError = new Error(message);
    err.status = 400;
    throw err;
  }

  return next();
};

export const loginErrorHandler = (
  err: IServerError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => res.status(500).redirect(loginRedirectUrl);

export const errorHandler = (
  err: IServerError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response<IResponseError> => {
  const message = err.message || "There was an error with your request.";
  const error: IResponseError = { type: "error", message };
  const status = "status" in err && err.status ? err.status : 500;

  return res.status(status).json(error);
};
