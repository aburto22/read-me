import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response<IResponseError> => {
  const message = err.message || "There was an error with your request.";
  const error: IResponseError = { type: "error", message };

  return res.status(500).json(error);
};

export default errorHandler;
