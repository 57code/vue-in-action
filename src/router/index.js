import { createRouter, createWebHashHistory } from "vue-router";
import CourseList from "/comps/CourseList.vue";
// import CourseAdd from "/comps/CourseAdd.vue";
// import CourseDetail from "/comps/CourseDetail.vue";
// import NotFound from "/comps/NotFound.vue";
// import Login from "/comps/Login.vue";

import Layout from "/layout/index.vue";

const CourseAdd = () => import("/comps/CourseAdd.vue");
const CourseDetail = () => import("/comps/CourseDetail.vue");
const NotFound = () => import("/comps/NotFound.vue");
const Login = () => import("/comps/Login.vue");

/**
 * Note: 子菜单仅当路由的children.length >= 1时才出现
 *
 * hidden: true                   设置为true时路由将显示在sidebar中(默认false)
 * alwaysShow: true               如果设置为true则总是显示在菜单根目录
 *                                如果不设置alwaysShow, 当路由有超过一个子路由时,
 *                                将会变为嵌套模式, 否则不会显示根菜单
 * redirect: noRedirect           如果设置noRedirect时，breadcrumb中点击将不会跳转
 * name:'router-name'             name用于<keep-alive> (必须设置!!!)
 * meta : {
    roles: ['admin','editor']    页面可访问角色设置 
    title: 'title'               sidebar和breadcrumb显示的标题 
    icon: 'svg-name'/'el-icon-x' sidebar中显示的图标
    breadcrumb: false            设置为false，将不会出现在面包屑中
    activeMenu: '/example/list'  如果设置一个path, sidebar将会在高亮匹配项
  }
 */
export const routes = [
  { path: "/", redirect: "/course", hidden: true },
  {
    path: "/course",
    component: Layout,
    meta: { title: "课程列表", icon: "el-icon-notebook-2" },
    children: [
      {
        path: "",
        name: "list",
        component: CourseList,
        meta: { title: "课程列表", icon: "el-icon-notebook-2" },
      },
      {
        path: "/course/:id",
        name: "detail",
        component: CourseDetail,
        meta: { title: "课程详情", icon: "el-icon-view" },
      },
    ],
  },

  { path: "/login", component: Login, hidden: true },

  // 下面配置会匹配所有path，匹配内容放入`$route.params.pathMatch`
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    hidden: true,
  },
  // 匹配所有以`/user-`开头path，匹配内容放入`$route.params.afterUser`
  // { path: '/user-:afterUser(.*)', component: UserGeneric },
];

// 权限路由
export const authRoutes = [
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
