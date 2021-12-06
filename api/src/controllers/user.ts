import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseUserId> | void> => {
  try {
    const { username, password } = req.body;

    const doc: IDBUser | null = await User.findOne({ username }).exec();

    if (doc) {
      const err: IServerError = new Error("Username already exists.");
      err.status = 409;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      hashedPassword,
      links: [],
    });

    const user = await newUser.save();

    return res.json({ type: "success", userId: user._id });
  } catch (err) {
    return next(err);
  }
};

export const checkAuth = (
  req: Request,
  res: Response
): Response<IResponseUserId> => {
  const userId = req.user ? req.user._id : null;
  return res.json({ type: "success", userId });
};

export const userLogout = (
  req: Request,
  res: Response
): Response<IResponseUserId> => {
  req.logout();
  return res.json({ type: "success", userId: null });
};
