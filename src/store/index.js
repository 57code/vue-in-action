import { createStore } from "vuex";
import count from "./modules/count";
import app from "./modules/app";
import user from "./modules/user";
import permission from "./modules/permission";

const store = createStore({
  modules: {
    count,
    app,
    permission,
    user,
  },
  getters: {
    sidebar: state => state.app.sidebar,
    settings: state => state.app.settings,
    avatar: state => state.user.avatar,
    token: state => state.user.token,
    roles: state => state.user.roles,
    permissionRoutes: state => state.permission.routes,
  },
});

export default store;
