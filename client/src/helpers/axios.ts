import { AxiosResponse } from "axios";

export const handleAxiosError = (err: Error): Error => {
  console.error(err);
  const message = err.message || "There was an error with your request.";
  return new Error(message);
};

export const handleAxiosResponseLinks = (
  res: AxiosResponse<IApiLinks | IApiError>
): ILink[] | Error => {
  const { data } = res;

  if (data.type === "error") {
    return new Error(data.message);
  }
  return data.links;
};

export const handleAxiosResponseUser = (
  res: AxiosResponse<IApiUserId | IApiError>
): IUserId | Error => {
  const { data } = res;

  if (data.type === "error") {
    return new Error(data.message);
  }
  return data.userId;
};
