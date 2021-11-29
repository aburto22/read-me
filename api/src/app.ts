import express, {
  Express,
  json,
  urlencoded,
  Request,
  Response,
  NextFunction,
} from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import router from "./router/router";
import "./helpers/auth";

const app: Express = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.nfrx7.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri);
mongoose.connection.on("error", (err) => console.error(err));
mongoose.connection.on("connection", () =>
  console.log("mongoose is connected")
);

export default app;
