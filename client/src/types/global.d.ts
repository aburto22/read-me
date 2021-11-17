declare interface ILink {
  name: string;
  description: string;
  link: string;
  isRead: boolean;
  image: string;
  _id: string;
}

declare interface IApiError {
  error: { message: string };
}
