import axios from "axios";
import { handleAxiosError, handleAxiosResponseLinks } from "../helpers/axios";

export const getLinks = (): Promise<ILink[] | Error> =>
  axios({
    method: "get",
    url: "/api/links",
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
  })
    .then(handleAxiosResponseLinks)
    .catch(handleAxiosError);

export const addLink = (
  link: string,
  tags: string[]
): Promise<ILink[] | Error> =>
  axios({
    method: "post",
    url: "/api/links",
    baseURL: process.env.REACT_APP_SERVER_URL,
    data: { link, tags },
    withCredentials: true,
  })
    .then(handleAxiosResponseLinks)
    .catch(handleAxiosError);

export const deleteLink = (linkId: string): Promise<ILink[] | Error> =>
  axios({
    method: "delete",
    url: "/api/links",
    baseURL: process.env.REACT_APP_SERVER_URL,
    data: { linkId },
    withCredentials: true,
  })
    .then(handleAxiosResponseLinks)
    .catch(handleAxiosError);

export const setReadLink = (
  linkId: string,
  bool: boolean
): Promise<ILink[] | Error> =>
  axios({
    method: "put",
    url: "/api/links",
    baseURL: process.env.REACT_APP_SERVER_URL,
    data: { linkId, bool },
    withCredentials: true,
  })
    .then(handleAxiosResponseLinks)
    .catch(handleAxiosError);

export const setLinkTags = (
  linkId: string,
  tags: string[]
): Promise<ILink[] | Error> =>
  axios({
    method: "put",
    url: "/api/links",
    baseURL: process.env.REACT_APP_SERVER_URL,
    data: { linkId, tags },
    withCredentials: true,
  })
    .then(handleAxiosResponseLinks)
    .catch(handleAxiosError);
