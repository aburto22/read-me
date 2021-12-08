import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

const domainUrl = process.env.HEROKU_URL || "http://localhost:5000";

const loginWithOauth = async (username: string, email: string) => {
  let user: IDBUser | null = await User.findOne({
    email,
  }).exec();

  if (!user) {
    const newUser = new User({
      username,
      email,
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

  return user;
};

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  User.findById(userId, done);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user: IDBUser | null = await User.findOne({
          email,
          hashedPassword: { $ne: "oauth2" },
        }).exec();

        if (!user) {
          const err: IServerError = new Error("Email not registered.");
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
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "an ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "a secret",
      callbackURL: `${domainUrl}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done): Promise<void> => {
      try {
        const username = profile.displayName.split(" ")[0];
        const email = profile.emails
          ? profile.emails[0].value
          : `${username}@google.com`;

        const user = await loginWithOauth(username, email);

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

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID || "an ID",
      clientSecret: process.env.FACEBOOK_APP_SECRET || "a secret",
      callbackURL: `${domainUrl}/api/auth/facebook/callback`,
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, done): Promise<void> => {
      try {
        console.log("profile: ", profile);

        const username = "testing";

        const user = await loginWithOauth(username, "test@email.com");

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
