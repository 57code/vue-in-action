export default function(store) {
  const initial = JSON.parse(localStorage.getItem("vuex-persist"));
  if (initial) {
    store.replaceState(initial);
  }

  store.subscribe((mutation, state) => {
    localStorage.setItem("vuex-persist", JSON.stringify(state));
  });
}
