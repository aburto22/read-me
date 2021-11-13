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
  }).then((res: AxiosResponse<ILink[]>) => res.data);
