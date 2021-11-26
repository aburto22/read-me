import { Request, Response } from "express";
import User from "../models/User";
import { ILink, IDBUser } from "../types/global";

export const updateTags = async (
  req: Request,
  res: Response
): Promise<Response<ILink[]>> => {
  const user = "user";
  const { linkId, tags }: { linkId: string; tags: string[] } = req.body;

  const doc: IDBUser | null = await User.findOne({ user }).exec();

  if (!doc) {
    return res.json([]);
  }

  const index = doc.links.findIndex((link) => link._id.toString() === linkId);

  doc.links[index].tags = tags;

  doc.markModified("links");

  await doc.save();

  return res.json(doc.links);
};
