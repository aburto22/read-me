import { Request, Response, NextFunction } from "express";
import Links from "../models/Links";
import { ILink, IDBUser, IDBLink } from "../types/global";
import { getSiteInfo } from "../helpers/website";

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

  const siteInfo = await getSiteInfo(link);

  let name;
  let description;

  if (siteInfo.data) {
    name = siteInfo.data.title;
    description = siteInfo.data?.description;
  }

  const newLink = {
    name: name || "",
    description: description || "",
    link,
    isRead: false,
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

export const updateLink = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<ILink[]>> => {
  const user = "user";
  const { linkId, bool }: { linkId: string; bool: boolean } = req.body;

  const doc: IDBUser | null = await Links.findOne({ user }).exec();

  if (!doc) {
    return res.json([]);
  }

  doc.links = doc.links.map((link) => {
    if (link._id.toString() === linkId) {
      return {
        name: link.name,
        description: link.description,
        link: link.link,
        isRead: bool,
      } as IDBLink;
    }
    return link;
  });

  await doc.save();

  return res.json(doc.links);
};
