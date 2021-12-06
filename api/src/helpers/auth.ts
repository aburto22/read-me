import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/User";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  User.findById(userId, done);
});

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user: IDBUser | null = await User.findOne({ username }).exec();

      if (!user) {
        const err: IServerError = new Error("Username not found.");
        err.status = 401;
        return done(err);
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.hashedPassword
      );

      if (!isPasswordValid) {
        const err: IServerError = new Error("Incorrect password.");
        err.status = 401;
        return done(err);
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
