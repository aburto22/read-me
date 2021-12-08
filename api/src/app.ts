import express, { Express, json, urlencoded } from "express";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import apiRouter from "./router/api";
import errorHandler from "./helpers/errorHandler";
import { getIndex } from "./controllers/index";
import "./helpers/auth";

const app: Express = express();
dotenv.config();

const buildFolder = path.join(__dirname, "../../", "client", "build");

app.use(express.static(buildFolder));

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );
} else {
  app.use(cors());
}

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

const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.nfrx7.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri);
mongoose.connection.on("error", (err) => console.error(err));
mongoose.connection.on("connection", () =>
  console.log("mongoose is connected")
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", getIndex);
app.use("/api", apiRouter);
app.use(getIndex);

app.use(errorHandler);

export default app;
