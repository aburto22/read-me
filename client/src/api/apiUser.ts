import axios from "axios";
import { handleAxiosError, handleAxiosResponseUser } from "../helpers/axios";

export const createUser = (
  username: string,
  password: string
): Promise<IUserId | Error> =>
  axios({
    method: "post",
    url: "/api/register",
    baseURL: process.env.REACT_APP_SERVER_URL,
    data: { username, password },
    withCredentials: true,
  })
    .then(handleAxiosResponseUser)
    .catch(handleAxiosError);

export const userLogin = (
  username: string,
  password: string
): Promise<IUserId | Error> =>
  axios({
    method: "post",
    url: "/api/login",
    baseURL: process.env.REACT_APP_SERVER_URL,
    data: { username, password },
    withCredentials: true,
  })
    .then(handleAxiosResponseUser)
    .catch(handleAxiosError);

export const userLogout = (): Promise<IUserId | Error> =>
  axios({
    method: "get",
    url: "/api/logout",
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
  })
    .then(handleAxiosResponseUser)
    .catch(handleAxiosError);

export const checkAuth = (): Promise<IUserId | Error> =>
  axios({
    method: "get",
    url: "/api/login",
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
  })
    .then(handleAxiosResponseUser)
    .catch(handleAxiosError);
