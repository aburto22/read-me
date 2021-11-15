import { Document } from "mongoose";

declare interface ILink {
  name: string;
  description: string;
  link: string;
  isRead: boolean;
}

declare interface IDBLink extends Document {
  name: string;
  description: string;
  link: string;
  isRead: boolean;
}

declare interface IDBUser extends Document {
  user: string;
  links: IDBLink[];
}
