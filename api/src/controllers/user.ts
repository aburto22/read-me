import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseUserId> | void> => {
  try {
    const { username, email, password } = req.body;

    const doc: IDBUser | null = await User.findOne({ email }).exec();

    if (doc) {
      const err: IServerError = new Error("Email already registered.");
      err.status = 409;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
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

export const redirectToApp = (req: Request, res: Response) => {
  const url = "http://localhost:3000/";
  res.redirect(url);
};

export const getUsername = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;

    if (!user) {
      const err: IServerError = new Error("User is not logged in.");
      err.status = 403;
      throw err;
    }

    return res.json({ type: "success", username: user.username });
  } catch (err) {
    return next(err);
  }
};
