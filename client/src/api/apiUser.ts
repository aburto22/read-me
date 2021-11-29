import axios, { AxiosResponse } from "axios";

const handleAxiosResponseUserId = (res: AxiosResponse<IUserId | IApiError>) => {
  if ("error" in res.data) {
    console.error(res.data.error.message);
    return null;
  }
  return res.data;
};

const handleAxiosError = (err: Error) => {
  throw err;
};

export const createUser = (
  username: string,
  password: string
): Promise<IUserId | null> =>
  axios({
    method: "post",
    url: "http://localhost:5000/register",
    data: { username, password },
    withCredentials: true,
  })
    .then(handleAxiosResponseUserId)
    .catch(handleAxiosError);

export const userLogin = (
  username: string,
  password: string
): Promise<IUserId | null> =>
  axios({
    method: "post",
    url: "http://localhost:5000/login",
    data: { username, password },
    withCredentials: true,
  })
    .then(handleAxiosResponseUserId)
    .catch(handleAxiosError);

export const checkAuth = (): Promise<IUserId | null> =>
  axios({
    method: "get",
    url: "http://localhost:5000/login",
    withCredentials: true,
  })
    .then(handleAxiosResponseUserId)
    .catch(handleAxiosError);
