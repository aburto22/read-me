import axios, { AxiosResponse } from "axios";

export const getLinks = (): Promise<ILink[]> =>
  axios({
    method: "get",
    url: "/links",
    baseURL: "http://localhost:5000",
  }).then((res: AxiosResponse<ILink[]>) => res.data);

export const addLink = (link: string): Promise<ILink[]> =>
  axios({
    method: "post",
    url: "/links",
    baseURL: "http://localhost:5000",
    data: { link },
  })
    .then((res: AxiosResponse<ILink[] | IApiError>) => {
      if ("error" in res.data) {
        throw new Error(res.data.error.message);
      }
      return res.data;
    })
    .catch((err: Error) => {
      throw err;
    });

export const deleteLink = (linkId: string): Promise<ILink[]> =>
  axios({
    method: "delete",
    url: "/links",
    baseURL: "http://localhost:5000",
    data: { linkId },
  }).then((res: AxiosResponse<ILink[]>) => res.data);

export const setReadLink = (linkId: string, bool: boolean): Promise<ILink[]> =>
  axios({
    method: "put",
    url: "/links",
    baseURL: "http://localhost:5000",
    data: { linkId, bool },
  }).then((res: AxiosResponse<ILink[]>) => res.data);
