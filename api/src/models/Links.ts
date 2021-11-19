import mongoose, { Schema } from "mongoose";
import { IDBUser } from "../types/global";

const LinksSchema = new Schema<IDBUser>({
  user: { type: String, default: "user" },
  links: [
    {
      link: { type: String, required: true },
      name: String,
      description: String,
      image: String,
      tags: [String],
      isRead: { type: Boolean, default: false },
    },
  ],
});

export default mongoose.model("Links", LinksSchema);
