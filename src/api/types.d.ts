export interface Player {
  id: number;
  accountname: string; // 账号名
  nickname: string; // 昵称
  avatar: string; // 用户头像
  level: number; // 用户等级
  exp: number; // 经验值
  rank: number; // 段位
  bravepoints: number; // 勇者积分
  winningstreak: number; // 连胜场次
  wanttoplay: Hero[]; // 想玩英雄
}

export interface Hero {
  id: number;
  name: string; // 英雄名称
  icon: string; // 英雄头像图标
  classify: string[]; // 英雄分类
}

export interface BanPick {
  hero: Hero;
  ban: number;
  pick: number;
}

// Bp
export interface Bp {
  ban: number[];
  pick: number[];
}
// 区间类型
export type RangeType = "week" | "month" | "quarter" | "year";

export type BanPickDetail = {
  [key in RangeType]: Bp;
};

export type BanPickDetailAndHero = { hero: Hero } & BanPickDetail

// 折线图数据结构
export interface LineChartData {
  heroName: string,
  xAxisData: string[],
  banData: number[],
  pickData: number[],
}