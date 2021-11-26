import { Request, Response } from "express";
import crypto from "crypto";
import User from "../models/User";
import { IDBUser, IUsername, IResponseError } from "../types/global";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response<IUsername | IResponseError | undefined>> => {
  const { username, password } = req.body;

  const doc: IDBUser | null = await User.findOne({ username }).exec();

  if (doc) {
    const error = { error: { message: "Username already exists." } };
    return res.json(error);
  }

  const salt = crypto.randomBytes(16).toString("base64");

  crypto.pbkdf2(
    password,
    salt,
    310000,
    32,
    "sha256",
    async (err, hashedPassword) => {
      if (err) {
        const error = { error: { message: err.message } };
        return res.json(error);
      }

      const newUser = new User({
        username,
        hashedPassword: hashedPassword.toString("base64"),
        salt,
        links: [],
      });

      const user = await newUser.save();

      return res.json({ username: user.username });
    }
  );
};
