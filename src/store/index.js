import { createStore } from "vuex";
import count from "./count";
import vuexPersist from "./vuex-persist";

const store = createStore({
  modules: {
    count,
  },
  plugins: [vuexPersist],
});

export default store;
