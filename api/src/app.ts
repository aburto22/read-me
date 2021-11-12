import express, { Express, json, urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./router/router";

const app: Express = express();
dotenv.config();

app.use(cors());
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

app.use(router);

const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.nfrx7.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri);
mongoose.connection.on("error", (err) => console.error(err));
mongoose.connection.on("connection", () =>
  console.log("mongoose is connected")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
