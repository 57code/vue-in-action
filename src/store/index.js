import { createStore } from "vuex";
import count from "./count";

const store = createStore({
  modules: {
    count,
  },
});

export default store;
