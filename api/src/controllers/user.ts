import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response<IUserId | IResponseError>> => {
  const { username, password } = req.body;

  const doc: IDBUser | null = await User.findOne({ username }).exec();

  if (doc) {
    const error = { error: { message: "Username already exists." } };
    return res.json(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    hashedPassword,
    links: [],
  });

  const user = await newUser.save();

  return res.json({ userId: user._id });
};

export const checkAuth = (
  req: Request,
  res: Response
): Response<IUserId | IResponseError> => {
  const userId = req.user ? req.user._id : null;
  return res.json({ userId });
};
