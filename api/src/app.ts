import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/routes";

const app: Express = express();

app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(router);

const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri);
mongoose.connection.on("error", (err) => console.error(err));
mongoose.connection.on("connection", () =>
  console.log("mongoose is connected")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
