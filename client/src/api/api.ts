import axios from "axios";

export const addLink = (link: string): Promise<ApiResponseT> =>
  axios
    .post<ApiResponseT>("http://localhost:5000/add-link", link)
    .then(({ data }) => {
      console.log("data: ", data);
      return data;
    });
