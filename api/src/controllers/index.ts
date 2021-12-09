import { Request, Response, NextFunction } from "express";
import path from "path";

export const passRouteToClient = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientPath = path.join(
    __dirname,
    "../../../",
    "client",
    "build",
    "index.html"
  );

  res.sendFile(clientPath);
};
