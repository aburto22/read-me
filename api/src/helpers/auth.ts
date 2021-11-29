import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/User";

passport.serializeUser((user, done) => {
  console.log("starting serializeUser");
  console.log("user: ", user);
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  console.log("starting deserializeUser");
  console.log("userId: ", userId);
  User.findById(userId, done);
});

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user: IDBUser | null = await User.findOne({ username }).exec();

      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.hashedPassword
      );

      if (!isPasswordValid) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
