export default {
  namespaced: true,
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false,
    },
    settings: {
      fixedHeader: false,
    },
  },
  mutations: {
    toggleSidebar: state => {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    },
    closeSidebar: (state, withoutAnimation) => {
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    changeSetting: (state, { key, value }) => {
      // eslint-disable-next-line no-prototype-builtins
      if (state.hasOwnProperty(key)) {
        state.settings[key] = value;
      }
    },
  },
};
