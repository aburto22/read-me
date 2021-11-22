import { Request, Response, NextFunction } from "express";
import Links from "../models/Links";
import { ILink, IDBUser, IDBLink, IResponseError } from "../types/global";
import { getSiteInfo, validateLink, appendHTTPS } from "../helpers/website";

export const getLinks = async (
  req: Request,
  res: Response
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
  res: Response
): Promise<Response<ILink[] | IResponseError>> => {
  const user = "user";
  const { link }: { link: string } = req.body;

  const httpsLink = appendHTTPS(link);

  if (!validateLink(httpsLink)) {
    const error = { error: { message: "Link is invalid." } };
    return res.json(error);
  }

  const siteInfo = await getSiteInfo(httpsLink);

  let name;
  let description;
  let image;

  if (siteInfo.type === "success") {
    name = siteInfo.data.title;
    description = siteInfo.data?.description;
    image = siteInfo.data?.image;
  }

  const newLink: ILink = {
    name: name || "",
    description: description || "",
    image: image || "",
    link: httpsLink,
    isRead: false,
    tags: [],
  };

  const doc: IDBUser | null = await Links.findOne({ user }).exec();

  if (!doc) {
    return res.json([]);
  }

  doc.links = [newLink as IDBLink, ...doc.links];

  await doc.save();

  return res.json(doc.links);
};

export const deleteLink = async (
  req: Request,
  res: Response
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
  res: Response
): Promise<Response<ILink[]>> => {
  const user = "user";
  const { linkId, bool }: { linkId: string; bool: boolean } = req.body;

  const doc: IDBUser | null = await Links.findOne({ user }).exec();

  if (!doc) {
    return res.json([]);
  }

  const index = doc.links.findIndex((link) => link._id.toString() === linkId);

  doc.links[index].isRead = bool;

  doc.markModified("links");

  await doc.save();

  return res.json(doc.links);
};
