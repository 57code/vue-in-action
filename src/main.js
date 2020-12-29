import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
// element3需要分别引入库和样式
import element3 from "element3";
import "element3/lib/theme-chalk/index.css";
// 全局样式引入
import "/styles/index.scss";

createApp(App)
  .use(router)
  .use(store)
  .use(element3)
  .mount("#app");
