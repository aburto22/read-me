import { Request, Response } from "express";
import User from "../models/User";
import { getSiteInfo, validateLink, appendHTTPS } from "../helpers/website";

export const getLinks = async (
  req: Request,
  res: Response
): Promise<Response<ILink[]>> => {
  const username = "username";
  const doc: IDBUser | null = await User.findOne({ username }).exec();

  if (!doc) {
    return res.json([]);
  }

  return res.json(doc.links);
};

export const addLink = async (
  req: Request,
  res: Response
): Promise<Response<ILink[] | IResponseError>> => {
  const username = "username";
  const { link, tags }: { link: string; tags: string[] } = req.body;

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
    tags: tags || [],
  };

  const doc: IDBUser | null = await User.findOne({ username }).exec();

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
  const username = "username";
  const { linkId }: { linkId: string } = req.body;

  const doc: IDBUser | null = await User.findOne({ username }).exec();

  if (!doc) {
    return res.json([]);
  }

  doc.links = doc.links.filter((link) => link._id.toString() !== linkId);

  await doc.save();

  return res.json(doc.links);
};

interface IRequestUpdateRead {
  linkId: string;
  bool: boolean;
}

interface IRequestUpdateTags {
  linkId: string;
  tags: string[];
}

type IRequestUpdateLink = IRequestUpdateRead | IRequestUpdateTags;

export const updateLink = async (
  req: Request,
  res: Response
): Promise<Response<ILink[]>> => {
  const username = "username";
  const data: IRequestUpdateLink = req.body;

  const { linkId } = data;

  const doc: IDBUser | null = await User.findOne({ username }).exec();

  if (!doc) {
    return res.json([]);
  }

  const index = doc.links.findIndex((link) => link._id.toString() === linkId);

  if ("bool" in data) {
    const { bool } = data;
    doc.links[index].isRead = bool;
  }

  if ("tags" in data) {
    const { tags } = data;
    doc.links[index].tags = tags;
  }

  doc.markModified("links");

  await doc.save();

  return res.json(doc.links);
};
