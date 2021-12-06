import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  User.findById(userId, done);
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "an ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "a secret",
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done): Promise<void> => {
      try {
        const username = profile.displayName.split(" ")[0];

        let user: IDBUser | null = await User.findOne({ username }).exec();

        if (!user) {
          const newUser = new User({
            username,
            hashedPassword: "oauth2",
            links: [],
          });

          user = await newUser.save();

          if (!user) {
            const err: IServerError = new Error("Error creating a new user.");
            err.status = 500;
            throw err;
          }
        }

        return done(null, user);
      } catch (err) {
        if (err instanceof Error) {
          return done(err);
        }
        return done(new Error("There was an error with OAuth2 request."));
      }
    }
  )
);
