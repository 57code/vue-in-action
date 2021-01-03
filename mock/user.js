const tokens = {
  admin: {
    token: "admin-token",
  },
  editor: {
    token: "editor-token",
  },
};

const users = {
  "admin-token": {
    roles: ["admin"],
    introduction: "超级管理员",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Admin",
  },
  "editor-token": {
    roles: ["editor"],
    introduction: "编辑",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Editor",
  },
};

module.exports = [
  // user login
  {
    url: "/api/user/login",
    type: "post",
    response: config => {
      const { username } = config.body;
      const token = tokens[username];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: "用户名或密码不正确",
        };
      }

      return {
        code: 20000,
        data: token,
      };
    },
  },

  // get user info
  {
    url: "/api/user/info",
    type: "get",
    response: config => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: "登录失败，不能获取用户信息",
        };
      }

      return {
        code: 20000,
        data: info,
      };
    },
  },

  // user logout
  {
    url: "/api/user/logout",
    type: "post",
    response: () => {
      return {
        code: 20000,
        data: "success",
      };
    },
  },
];
