import axios from "axios";
import { handleAxiosError, handleAxiosResponseUser } from "../helpers/axios";

export const createUser = (
  username: string,
  password: string
): Promise<IUserId | Error> =>
  axios({
    method: "post",
    url: "http://localhost:5000/register",
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
    url: "http://localhost:5000/login",
    data: { username, password },
    withCredentials: true,
  })
    .then(handleAxiosResponseUser)
    .catch(handleAxiosError);

export const userLogout = (): Promise<IUserId | Error> =>
  axios({
    method: "get",
    url: "http://localhost:5000/logout",
    withCredentials: true,
  })
    .then(handleAxiosResponseUser)
    .catch(handleAxiosError);

export const checkAuth = (): Promise<IUserId | Error> =>
  axios({
    method: "get",
    url: "http://localhost:5000/login",
    withCredentials: true,
  })
    .then(handleAxiosResponseUser)
    .catch(handleAxiosError);
