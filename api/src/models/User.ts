import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema<IDBUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
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

export default mongoose.model("User", UserSchema);
