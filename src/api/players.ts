import request from "../utils/request";

export const getPlayers = (params?: any) => {
  return request({
    url: "/players",
    method: "get",
    params,
  });
};

export const createPlayer = (data: any) =>
  request({
    url: "/players",
    method: "post",
    data,
  });

export const getPlayer = (id: number) => {
  return request({
    url: "/players/" + id,
    method: "get",
  });
};

export const updatePlayer = (id: number, data: any) =>
  request({
    url: "/players/" + id,
    method: "put",
    data,
  });

export const deletePlayer = (id: number) =>
  request({
    url: "/players",
    method: "delete",
    params: { id },
    
  });
