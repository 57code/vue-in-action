import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import Message from "./components/Message.vue";
import router from "./router/index";

createApp(App)
  .use(router)
  .component("message", Message)
  .mount("#app");
