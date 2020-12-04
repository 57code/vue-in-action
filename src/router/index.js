import { createRouter, createWebHashHistory } from "vue-router";
import CourseList from "/comps/CourseList.vue";
// import CourseAdd from "/comps/CourseAdd.vue";
// import CourseDetail from "/comps/CourseDetail.vue";
// import NotFound from "/comps/NotFound.vue";
// import Login from "/comps/Login.vue";

const CourseAdd = () => import("/comps/CourseAdd.vue");
const CourseDetail = () => import("/comps/CourseDetail.vue");
const NotFound = () => import("/comps/NotFound.vue");
const Login = () => import("/comps/Login.vue");

// 1.配置
const routes = [
  { path: "/", redirect: "/course" },
  {
    path: "/course",
    component: CourseList,
    name: "list",
    children: [
      { path: "/course/:id", name: "detail", component: CourseDetail },
    ],
  },

  { path: "/login", component: Login },

  // 下面配置会匹配所有path，匹配内容放入`$route.params.pathMatch`
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  // 匹配所有以`/user-`开头path，匹配内容放入`$route.params.afterUser`
  // { path: '/user-:afterUser(.*)', component: UserGeneric },
];

// 权限路由
const authRoutes = [
  {
    path: "/course/add",
    name: "add",
    component: CourseAdd,
    parent: "list",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 是否添加权限路由
let hasAuth = false;
const whitelist = ["/login"];
router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token")) {
    // 如果已经授权
    if (hasAuth) {
      // 添加过直接放行
      next();
    } else {
      // 动态添加权限路由
      hasAuth = true;
      authRoutes.forEach(route => {
        if (route.parent) {
          router.addRoute(route.parent, route);
        } else {
          router.addRoute(route);
        }
      });
      next({ ...to, replace: true });
    }
  } else {
    if (whitelist.includes(to.path)) {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});

// router.beforeEach((to, from, next) => {
//   // 判断是否去add
//   if (to.meta.requiresAuth) {
//     // 判断是否登录
//     if (localStorage.getItem("token")) {
//       // 已登录
//       next();
//     } else {
//       // 未登录
//       next({ path: "/login", query: { redirect: to.path } });
//     }
//   } else {
//     next();
//   }
// });

// 2.创建实例
export default router;
