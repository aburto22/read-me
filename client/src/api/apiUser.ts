import axios, { AxiosResponse } from "axios";

export const createUser = (
  username: string,
  password: string
): Promise<IUsername> =>
  axios({
    method: "post",
    url: "/register",
    baseURL: "http://localhost:5000",
    data: { username, password },
  })
    .then((res: AxiosResponse<IUsername | IApiError>) => {
      if ("error" in res.data) {
        throw new Error(res.data.error.message);
      }
      return res.data;
    })
    .catch((err: Error) => {
      throw err;
    });
