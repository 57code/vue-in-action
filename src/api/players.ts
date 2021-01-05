import { AxiosPromise } from "axios";
import request from "../utils/request";

export const getPlayers = (params?: any) => {
  return request({
    url: "/players",
    method: "get",
    params,
  });
};
