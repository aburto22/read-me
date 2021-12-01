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
