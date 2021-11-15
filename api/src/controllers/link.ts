import { Request, Response, NextFunction } from "express";
import Links from "../models/Links";
import { ILink, IDBUser, IDBLink } from "../types/global";

export const getLinks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<ILink[]>> => {
  const user = "user";
  const doc: IDBUser | null = await Links.findOne({ user }).exec();

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
  const { link }: { link: string } = req.body;
  const newLink = {
    name: "new link",
    description: "some text",
    link,
  } as IDBLink;

  const doc: IDBUser | null = await Links.findOne({ user }).exec();

  if (!doc) {
    return res.json([]);
  }

  doc.links = [...doc.links, newLink];

  await doc.save();

  return res.json(doc.links);
};

export const deleteLink = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<ILink[]>> => {
  const user = "user";
  const { linkId }: { linkId: string } = req.body;

  const doc: IDBUser | null = await Links.findOne({ user }).exec();

  if (!doc) {
    return res.json([]);
  }

  doc.links = doc.links.filter((link) => link._id.toString() !== linkId);

  await doc.save();

  return res.json(doc.links);
};
