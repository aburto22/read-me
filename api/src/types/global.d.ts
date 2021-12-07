import { Document } from "mongoose";

declare global {
  namespace Express {
    interface User {
      username: string;
      email: string;
      _id?: string;
    }
  }

  interface IServerError extends Error {
    status?: number;
  }

  interface IResponseError {
    type: "error";
    message: string;
  }

  interface IResponseUserId {
    type: "success";
    userId: string | null;
  }

  interface IResponseLinks {
    type: "success";
    links: ILink[];
  }

  interface IUserId {
    userId: string | null;
  }

  interface ILink {
    name: string;
    description: string;
    link: string;
    isRead: boolean;
    image: string;
    tags: string[];
  }

  interface IDBLink extends Document {
    name: string;
    description: string;
    link: string;
    isRead: boolean;
    image: string;
    tags: string[];
  }

  interface IDBUser extends Document {
    username: string;
    email: string;
    hashedPassword: string;
    links: Array<IDBLink>;
  }
}
