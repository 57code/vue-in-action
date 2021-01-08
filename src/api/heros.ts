import request from "../utils/request";

// 获取英雄办选率列表数据
export function getBanpick(params: any) {
  return request.get("/heros/banpick", {
    params,
  });
}

// 获取英雄办选数据详情
export function getBanpickDetail(id: string) {
  return request.get("/heros/banpick-detail", {
    params: { id },
  });
}
