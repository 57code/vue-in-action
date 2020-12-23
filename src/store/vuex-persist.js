export default function(store) {
  store.replaceState(JSON.parse(localStorage.getItem("vuex-persist")));

  store.subscribe((mutation, state) => {
    localStorage.setItem("vuex-persist", JSON.stringify(state));
  });
}
