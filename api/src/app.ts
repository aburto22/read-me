import express, { Express, json, urlencoded } from "express";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import apiRouter from "./router/api";
import errorHandler from "./helpers/errorHandler";
import { passRouteToClient } from "./controllers/index";
import "./helpers/auth";

// Enable env variables.

dotenv.config();

// Create app

const app: Express = express();

// Configur CORS

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

// Static routes

const buildFolder = path.join(__dirname, "../../", "client", "build");
app.use(express.static(buildFolder));

// Enable cookies, json and urlencoded

app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// Create connection to db and connect

const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.nfrx7.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(mongoUrl);
mongoose.connection.on("error", (err) => console.error(err));
mongoose.connection.on("connection", () =>
  console.log("mongoose is connected")
);

// Enable sessions

const store = MongoStore.create({
  mongoUrl,
});

let sessionConfig: session.SessionOptions = {
  secret: process.env.SESSION_SECRET_DEV || "secret",
};

if (process.env.NODE_ENV === "production") {
  sessionConfig = {
    ...sessionConfig,
    store,
    resave: true,
    saveUninitialized: true,
  };
} else {
  sessionConfig = {
    ...sessionConfig,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  };
}

app.use(session(sessionConfig));

// Initialize auth and sessions with passport

app.use(passport.initialize());
app.use(passport.session());

// Enable routes and forward any unknown routes to client

app.get("/", passRouteToClient);
app.use("/api", apiRouter);
app.use(passRouteToClient);

// Handle errors

app.use(errorHandler);

// Export app

export default app;
