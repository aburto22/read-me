import axios, { AxiosResponse } from "axios";
import { handleAxiosError, handleAxiosResponseLinks } from "../helpers/axios";

export const getLinks = (): Promise<ILink[] | Error> =>
  axios({
    method: "get",
    url: "/links",
    baseURL: "http://localhost:5000",
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
    url: "/links",
    baseURL: "http://localhost:5000",
    data: { link, tags },
    withCredentials: true,
  })
    .then(handleAxiosResponseLinks)
    .catch(handleAxiosError);

export const deleteLink = (linkId: string): Promise<ILink[] | Error> =>
  axios({
    method: "delete",
    url: "/links",
    baseURL: "http://localhost:5000",
    data: { linkId },
    withCredentials: true,
  }).then((res: AxiosResponse<ILink[]>) => res.data);

export const setReadLink = (
  linkId: string,
  bool: boolean
): Promise<ILink[] | Error> =>
  axios({
    method: "put",
    url: "/links",
    baseURL: "http://localhost:5000",
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
    url: "/links",
    baseURL: "http://localhost:5000",
    data: { linkId, tags },
    withCredentials: true,
  })
    .then(handleAxiosResponseLinks)
    .catch(handleAxiosError);
