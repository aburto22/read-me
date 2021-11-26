import { Document } from "mongoose";

declare interface IResponseError {
  error: { message: string };
}

declare interface IUsername {
  username: string;
}

declare interface ILink {
  name: string;
  description: string;
  link: string;
  isRead: boolean;
  image: string;
  tags: string[];
}

declare interface IDBLink extends Document {
  name: string;
  description: string;
  link: string;
  isRead: boolean;
  image: string;
  tags: string[];
}

declare interface IDBUser extends Document {
  username: string;
  hashedPassword: string;
  salt: string;
  links: Array<IDBLink>;
}
