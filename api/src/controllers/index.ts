import { Request, Response, NextFunction } from "express";

export const getIndex = (req: Request, res: Response, next: NextFunction) => {
  console.log("I am the index");
};
