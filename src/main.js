import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import CourseList from "./components/CourseList.vue";
import Message from "./components/Message.vue";

createApp(App)
  .component("course-list", CourseList)
  .component("message", Message)
  .mount("#app");
