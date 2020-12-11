import { COUNT_INC } from "./mutation-types";

export default {
  namespaced: true,
  state() {
    return {
      count: 0,
    };
  },
  getters: {
    doubleCount(state, getters, rootStates, rootGetters) {
      console.log(getters, rootStates, rootGetters);
      return state.count * 2;
    },
    nCount(state) {
      return n => {
        return state.count * n;
      };
    },
  },
  mutations: {
    inc(state) {
      // 必须是同步的
      state.count++;
    },
    [COUNT_INC](state) {
      state.count++;
    },
    incBy(state, n) {
      state.count += n;
    },
  },
  actions: {
    inc({ commit, rootState, rootGetters }) {
      console.log(rootState, rootGetters);
      return new Promise(resolve => {
        // context: commit, dispatch, state
        setTimeout(() => {
          commit("inc");
          resolve();
        }, 1000);
      });
    },
  },
};
