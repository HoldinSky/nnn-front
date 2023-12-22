import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const HOST = "http://localhost:3000";

type reqMethod = "get" | "post" | "put" | "delete";

export function backendCall(
  method: reqMethod,
  url: string,
  config?: AxiosRequestConfig<any>
): Promise<AxiosResponse<any, any>> {
  return axios({
    url: `${HOST}${url}`,
    method,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    ...config,
  });
}
