import request from "/utils/request";
import { getToken, setToken, removeToken } from "/utils/auth";

const state = {
  token: getToken(),
  name: "",
  avatar: "",
  introduction: "",
  roles: [],
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      request({
        url: "/user/login",
        method: "post",
        data: { username: username.trim(), password: password },
      })
        .then(response => {
          const { data } = response;
          // 存放令牌状态
          commit("SET_TOKEN", data.token);
          // 存入cookie
          setToken(data.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      request({
        url: "/user/info",
        method: "post",
        params: { token: state.token },
      })
        .then(response => {
          const { data } = response;
          const { roles, name, avatar, introduction } = data;

          commit("SET_ROLES", roles);
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_INTRODUCTION", introduction);

          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      return request({
        url: "/user/logout",
        method: "post",
      })
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);

          removeToken();

          dispatch("permission/resetRoutes", null, { root: true });

          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      resolve();
    });
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    // 重新设置令牌
    const token = role + "-token";
    commit("SET_TOKEN", token);

    // 重新获取用户角色
    const { roles } = await dispatch("getInfo");

    // 重置路由为初始状态
    dispatch("permission/resetRoutes", null, { root: true });

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch("permission/generateRoutes", roles, {
      root: true,
    });
    // dynamically add accessible routes
    dispatch("permission/addRoutes", accessRoutes, {
      root: true,
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
