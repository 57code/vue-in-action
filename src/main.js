import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";

// element3需要分别引入库和样式
import element3 from "element3";
import "element3/lib/theme-chalk/index.css";

// 全局样式引入
import "/styles/index.scss";

// 指令
import permission from "/dirs/permission";

// 工具方法
import { parseTime } from "/utils/parse";

const app = createApp(App)
  .use(element3)
  .use(store)
  .use(router);
app.config.globalProperties.$parseTime = parseTime;
app.directive("permission", permission);
app.mount("#app");
