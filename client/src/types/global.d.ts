declare interface ILink {
  name: string;
  description: string;
  link: string;
  isRead: boolean;
  image: string;
  tags: string[];
  _id: string;
}

declare interface IApiError {
  type: "error";
  message: string;
}

declare interface IApiUserId {
  type: "success";
  userId: string | null;
}

declare interface IApiUsername {
  type: "success";
  username: string;
}

declare interface IApiLinks {
  type: "success";
  links: ILink[];
}

declare type IUserId = string | null;

declare type IUsername = string;
