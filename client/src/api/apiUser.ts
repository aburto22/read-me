import axios from "axios";
import {
  handleAxiosError,
  handleAxiosResponseUserId,
  handleAxiosResponseUsername,
} from "../helpers/axios";

export const createUser = (
  username: string,
  email: string,
  password: string
): Promise<IUserId | Error> =>
  axios({
    method: "post",
    url: "/api/register",
    baseURL: process.env.REACT_APP_SERVER_URL,
    data: { username, email, password },
    withCredentials: true,
  })
    .then(handleAxiosResponseUserId)
    .catch(handleAxiosError);

export const userLogin = (
  email: string,
  password: string
): Promise<IUserId | Error> =>
  axios({
    method: "post",
    url: "/api/login",
    baseURL: process.env.REACT_APP_SERVER_URL,
    data: { email, password },
    withCredentials: true,
  })
    .then(handleAxiosResponseUserId)
    .catch(handleAxiosError);

export const userLogout = (): Promise<IUserId | Error> =>
  axios({
    method: "get",
    url: "/api/logout",
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
  })
    .then(handleAxiosResponseUserId)
    .catch(handleAxiosError);

export const checkAuth = (): Promise<IUserId | Error> =>
  axios({
    method: "get",
    url: "/api/login",
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
  })
    .then(handleAxiosResponseUserId)
    .catch(handleAxiosError);

export const getUsername = (): Promise<IUsername | Error> =>
  axios({
    method: "get",
    url: "/api/username",
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
  })
    .then(handleAxiosResponseUsername)
    .catch(handleAxiosError);
