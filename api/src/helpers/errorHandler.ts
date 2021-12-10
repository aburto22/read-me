import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const clientUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
const loginRedirectUrl = `${clientUrl}/login-error`;

// TODO: Check query params.

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
