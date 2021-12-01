import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { getSiteInfo, validateLink, appendHTTPS } from "../helpers/website";

export const getLinks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseLinks> | void> => {
  try {
    if (!req.user) {
      const message = "User is not logged-in.";
      throw new Error(message);
    }

    const userId = req.user._id;

    const doc: IDBUser | null = await User.findById(userId).exec();

    if (!doc) {
      const message = "User not found.";
      throw new Error(message);
    }

    return res.json({ type: "success", links: doc.links });
  } catch (err) {
    return next(err);
  }
};

export const addLink = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseLinks> | void> => {
  try {
    if (!req.user) {
      const message = "User is not logged-in.";
      throw new Error(message);
    }

    const userId = req.user._id;

    const { link, tags }: { link: string; tags: string[] } = req.body;

    const httpsLink = appendHTTPS(link);

    if (!validateLink(httpsLink)) {
      const message = "Link is invalid.";
      throw new Error(message);
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

    const doc: IDBUser | null = await User.findById(userId).exec();

    if (!doc) {
      const message = "User not found.";
      throw new Error(message);
    }

    doc.links = [newLink as IDBLink, ...doc.links];

    await doc.save();

    return res.json({ type: "success", links: doc.links });
  } catch (err) {
    return next(err);
  }
};

export const deleteLink = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseLinks> | void> => {
  try {
    if (!req.user) {
      const message = "User is not logged-in.";
      throw new Error(message);
    }

    const userId = req.user._id;
    const { linkId }: { linkId: string } = req.body;

    const doc: IDBUser | null = await User.findById(userId).exec();

    if (!doc) {
      const message = "User not found.";
      throw new Error(message);
    }

    doc.links = doc.links.filter((link) => link._id.toString() !== linkId);

    await doc.save();

    return res.json({ type: "success", links: doc.links });
  } catch (err) {
    return next(err);
  }
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
  res: Response,
  next: NextFunction
): Promise<Response<IResponseLinks> | void> => {
  try {
    if (!req.user) {
      const message = "User is not logged-in.";
      throw new Error(message);
    }

    const userId = req.user._id;

    const data: IRequestUpdateLink = req.body;

    const { linkId } = data;

    const doc: IDBUser | null = await User.findById(userId).exec();

    if (!doc) {
      const message = "User not found.";
      throw new Error(message);
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

    return res.json({ type: "success", links: doc.links });
  } catch (err) {
    return next(err);
  }
};
