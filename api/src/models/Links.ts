import mongoose, { Schema } from "mongoose";
import { IDBUser } from "../types/global";

const LinksSchema = new Schema<IDBUser>({
  user: { type: String, default: "user" },
  links: [
    {
      link: { type: String, required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
});

export default mongoose.model("Links", LinksSchema);
