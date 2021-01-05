export interface Player {
  id: number,
  accountname: string, // 账号名
  nickname: string, // 昵称
  avatar: string, // 用户头像
  level: number,// 用户等级
  exp: number,// 经验值
  rank: number, // 段位
  bravepoints: number, // 勇者积分
  winningstreak: number, // 连胜场次
  wanttoplay: Hero[] // 想玩英雄
}

export interface Hero {
  id: number,
  name: string, // 英雄名称
  icon: string, // 英雄头像图标
  classify: string[] // 英雄分类
}