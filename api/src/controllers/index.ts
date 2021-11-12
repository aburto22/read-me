import { Request, Response, NextFunction } from "express";

export const getIndex = (req: Request, res: Response, next: NextFunction) => {
  res.json({ title: "index", message: "I am the index" });
};
