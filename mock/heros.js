// 英雄相关接口编写的地方
const heros = [
  { id: 1, name: "百里玄策", icon: "xc.jpg", classify: ["刺客"] },
  { id: 2, name: "孙悟空", icon: "swc.jpg", classify: ["刺客"] },
  { id: 3, name: "鲁班七号", icon: "lbqh.jpg", classify: ["射手"] },
  { id: 4, name: "后羿", icon: "hy.jpg", classify: ["射手"] },
  { id: 5, name: "王昭君", icon: "wzj.jpg", classify: ["法师"] },
  { id: 6, name: "貂蝉", icon: "dc.jpg", classify: ["法师"] },
  { id: 7, name: "钟馗", icon: "zk.jpg", classify: ["法师", "辅助"] },
  { id: 8, name: "牛魔", icon: "nm.jpg", classify: ["坦克", "辅助"] },
  { id: 9, name: "亚瑟", icon: "ys.jpg", classify: ["战士", "坦克"] },
  { id: 10, name: "吕布", icon: "lb.jpg", classify: ["战士"] },
];

// 模拟办选数据
const banpick = [
  { hero: heros[0], ban: 0.05, pick: 0.15 },
  { hero: heros[1], ban: 0.15, pick: 0.3 },
  { hero: heros[2], ban: 0.01, pick: 0.42 },
  { hero: heros[3], ban: 0.02, pick: 0.43 },
  { hero: heros[4], ban: 0.12, pick: 0.35 },
  { hero: heros[5], ban: 0.05, pick: 0.12 },
  { hero: heros[6], ban: 0.1, pick: 0.32 },
  { hero: heros[7], ban: 0.06, pick: 0.18 },
  { hero: heros[8], ban: 0.03, pick: 0.15 },
  { hero: heros[9], ban: 0.07, pick: 0.29 },
];

// 某个英雄的办选详情
const banpickDetail = [
  {
    hero: heros[0],
    week: {
      ban: [0.05, 0.04, 0.03, 0.05, 0.06, 0.05, 0.05],
      pick: [0.15, 0.1, 0.11, 0.12, 0.09, 0.12, 0.11],
    },
    month: {
      ban: [
        0.05,
        0.04,
        0.03,
        0.05,
        0.06,
        0.05,
        0.05,
        0.05,
        0.04,
        0.03,
        0.05,
        0.06,
        0.05,
        0.05,
        0.05,
        0.04,
        0.03,
        0.05,
        0.06,
        0.05,
        0.05,
        0.05,
        0.04,
        0.03,
        0.05,
        0.06,
        0.05,
        0.05,
      ],
      pick: [
        0.15,
        0.1,
        0.11,
        0.12,
        0.09,
        0.12,
        0.11,
        0.05,
        0.04,
        0.03,
        0.05,
        0.06,
        0.05,
        0.05,
        0.05,
        0.04,
        0.03,
        0.05,
        0.06,
        0.05,
        0.05,
        0.05,
        0.04,
        0.03,
        0.05,
        0.06,
        0.05,
        0.05,
      ],
    },
    quarter: {
      ban: [0.05, 0.04, 0.03, 0.05],
      pick: [0.15, 0.1, 0.11, 0.12],
    },
    year: {
      ban: [
        0.05,
        0.04,
        0.03,
        0.05,
        0.06,
        0.05,
        0.05,
        0.03,
        0.05,
        0.06,
        0.05,
        0.05,
      ],
      pick: [
        0.15,
        0.1,
        0.11,
        0.12,
        0.09,
        0.12,
        0.11,
        0.1,
        0.11,
        0.12,
        0.09,
        0.1,
      ],
    },
  },
];

module.exports = [
  {
    url: "/api/heros/banpick",
    type: "get",
    response: config => {
      const { page = 1, limit = 20 } = config.query;
      const pageList = banpick.filter(
        (_, index) => index < limit * page && index >= limit * (page - 1)
      );

      return {
        code: 20000,
        data: {
          banpick: pageList,
          total: banpick.length,
        },
      };
    },
  },
  {
    url: "/api/heros/banpick-detail",
    type: "get",
    response: config => {
      // 获取英雄id
      const { id } = config.query;
      const detail = banpickDetail.find(item => item.hero.id === +id);

      return {
        code: 20000,
        data: {
          detail,
        },
      };
    },
  },
];
module.exports.heros = heros;
