import { createStore } from "vuex";
import count from "./modules/count";
import app from "./modules/app";
import vuexPersist from "./plugins/vuex-persist";

const store = createStore({
  modules: {
    count,
    app,
  },
  getters: {
    sidebar: state => state.app.sidebar,
    settings: state => state.app.settings,
    avatar: state => state.user.avatar,
  },
  plugins: [vuexPersist],
});

export default store;
