import { createRouter, createWebHashHistory } from "vue-router";
import CourseList from "/comps/CourseList.vue";
import CourseAdd from "/comps/CourseAdd.vue";
import CourseDetail from "/comps/CourseDetail.vue";
import NotFound from "/comps/NotFound.vue";
// 1.配置
const routes = [
  { path: "/", redirect: "/course" },
  {
    path: "/course",
    component: CourseList,
    children: [
      { path: "/course/add", name: "add", component: CourseAdd },
      { path: "/course/:id", name: "detail", component: CourseDetail },
    ],
  },

  // 下面配置会匹配所有path，匹配内容放入`$route.params.pathMatch`
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  // 匹配所有以`/user-`开头path，匹配内容放入`$route.params.afterUser`
  // { path: '/user-:afterUser(.*)', component: UserGeneric },
];

// 2.创建实例
export default createRouter({
  history: createWebHashHistory(),
  routes,
});
