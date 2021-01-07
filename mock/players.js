const { heros } = require("./heros");
// npm i faker -D
const faker = require("faker");

faker.locale = "zh_CN";

// 模拟玩家数据
const playerCount = 100;
const playerList = [];

for (let i = 0; i < playerCount; i++) {
  playerList.push({
    id: i,
    accountname: faker.name.findName(),
    avatar: faker.image.avatar(),
    bravepoints: faker.random.number(1000),
    exp: faker.random.number(100000),
    level: faker.random.number(30),
    nickname: faker.name.findName(),
    rank: faker.random.number(200),
    wanttoplay: genWantoplay(),
    winningstreak: faker.random.number(10),
  });
}

function genWantoplay() {
  let wanttoplay = new Set();
  while (wanttoplay.size < 3) {
    wanttoplay.add(heros[faker.random.number(9)]);
  }
  return Array.from(wanttoplay);
}

module.exports = [
  {
    url: "/api/players/:id",
    type: "get",
    response: config => {
      const { id } = config.params;
      for (const player of playerList) {
        if (player.id.toString() === id) {
          return {
            code: 20000,
            data: player,
          };
        }
      }

      // 没找到响应数据，报错
      return {
        code: 70001,
        message: "没有找到相应的玩家信息",
      };
    },
  },
  {
    url: "/api/players",
    type: "get",
    response: config => {
      // 从查询参数中获取分页、过滤关键词等参数
      const { accountname, page = 1, limit = 10 } = config.query;

      // 过滤
      let mockList = playerList.filter(item => {
        if (accountname && item.accountname.indexOf(accountname) < 0) {
          return false;
        }
        return true;
      });

      // 分页
      const pageList = mockList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      );

      return {
        code: 20000,
        data: {
          total: mockList.length,
          players: pageList,
        },
      };
    },
  },
  {
    url: "/api/players",
    type: "post",
    response: config => {
      // 新增的英雄数据
      const { player } = config.body;

      // 直接返回
      return {
        code: 20000,
        data: {
          player,
        },
      };
    },
  },
  {
    url: "/api/players",
    type: "put",
    response: () => {
      return {
        code: 20000,
      };
    },
  },
  {
    url: "/api/players/",
    type: "delete",
    response: () => {
      return {
        code: 20000,
      };
    },
  },
];
