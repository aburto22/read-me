import { Request, Response, NextFunction } from "express";

const errorHandler = (
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

export default errorHandler;
