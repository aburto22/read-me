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
  error: { message: string };
}

declare interface IUserId {
  userId: string;
}
