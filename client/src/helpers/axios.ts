import axios, { AxiosResponse, AxiosError } from "axios";

export const handleAxiosError = (err: AxiosError<IApiError> | Error): Error => {
  let message;

  if (axios.isAxiosError(err) && err.response) {
    message = err.response.data.message;
  } else {
    message = err.message || "There was an error with your request.";
  }

  console.error("Error: ", message);

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

export const handleAxiosResponseUserId = (
  res: AxiosResponse<IApiUserId | IApiError>
): IUserId | Error => {
  const { data } = res;

  if (data.type === "error") {
    return new Error(data.message);
  }
  return data.userId;
};

export const handleAxiosResponseUsername = (
  res: AxiosResponse<IApiUsername | IApiError>
): IUsername | Error => {
  const { data } = res;

  if (data.type === "error") {
    return new Error(data.message);
  }
  return data.username;
};
