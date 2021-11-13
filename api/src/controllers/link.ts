import { Request, Response, NextFunction } from "express";
import Links from "../models/Links";
import { ILink, IDBUser } from "../types/global";

export const getLinks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<ILink[]>> => {
  const user = "user";
  const doc: IDBUser | null = await Links.findOne({ user });

  if (!doc) {
    return res.json([]);
  }

  return res.json(doc.links);
};

export const addLink = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<ILink[]>> => {
  const user = "user";
  const { link } = req.body;
  const newLink: ILink = {
    name: "new link",
    description: "some text",
    link,
  };

  const doc: IDBUser | null = await Links.findOne({ user });

  if (!doc) {
    return res.json([]);
  }

  doc.links = [...doc.links, newLink];

  await doc.save();

  return res.json(doc.links);
};
