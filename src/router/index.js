import { createRouter, createWebHashHistory } from "vue-router";
import store from "/@/store";
import { getToken } from "/utils/auth";
import { Message } from "element3";

// import CourseAdd from "/comps/CourseAdd.vue";
// import CourseDetail from "/comps/CourseDetail.vue";
// import NotFound from "/comps/NotFound.vue";
// import Login from "/comps/Login.vue";

import Layout from "/layout/index.vue";

const CourseList = () => import("/views/course/CourseList.vue");
const CourseDetail = () => import("/views/course/CourseDetail.vue");
const CourseAdd = () => import("/views/course/CourseAdd.vue");
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
export const constantRoutes = [
  { path: "/login", component: Login, hidden: true },

  // 首页
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: { title: "首页", icon: "el-icon-s-home", affix: true },
      },
    ],
  },
];

// 权限路由
export const asyncRoutes = [
  {
    path: "/players",
    component: Layout,
    meta: {
      title: "玩家管理",
      icon: "el-icon-user-solid",
    },
    children: [
      {
        path: "list",
        component: () => import("/@/views/player/list.vue"),
        meta: {
          title: "玩家列表",
          icon: "el-icon-document",
        },
      },
      {
        path: "create",
        component: () => import("/@/views/player/create.vue"),
        meta: {
          title: "创建玩家",
          icon: "el-icon-edit",
        },
      },
      {
        path: "edit/:id(\\d+)",
        component: () => import("/@/views/player/edit.vue"),
        hidden: true, // 不需要导航菜单
        meta: {
          title: "editPlayer",
          activeMenu: "/players/list", // 左侧导航菜单相关激活url
        },
      },
    ],
  },

  {
    path: "/course",
    component: Layout,
    alwaysShow: true,
    meta: {
      title: "课程管理",
      icon: "el-icon-video-camera",
      roles: ["admin"],
    },
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
        hidden: true,
      },
      {
        path: "/course-add",
        name: "course-add",
        component: CourseAdd,
        hidden: true,
      },
    ],
  },

  {
    path: "/example",
    component: Layout,
    redirect: "/example/list",
    name: "Example",
    meta: {
      title: "表格",
      icon: "el-icon-s-help",
    },
    children: [
      {
        path: "create",
        component: () => import("/@/views/example/create.vue"),
        name: "CreateArticle",
        meta: { title: "创建文章", icon: "el-icon-edit" },
      },
      {
        path: "edit/:id(\\d+)",
        component: () => import("/@/views/example/edit.vue"),
        name: "EditArticle",
        meta: {
          title: "编辑文章",
          noCache: true,
          activeMenu: "/example/list",
        },
        hidden: true,
      },
      {
        path: "list",
        component: () => import("/@/views/example/list.vue"),
        name: "ArticleList",
        meta: { title: "文章列表", icon: "el-icon-document" },
      },
    ],
  },

  {
    path: "/charts",
    component: Layout,
    redirect: "noRedirect",
    name: "Charts",
    alwaysShow: true,
    meta: {
      title: "图表",
      icon: "el-icon-pie-chart",
    },
    children: [
      {
        path: "line",
        component: () => import("/@/views/charts/line.vue"),
        name: "LineChart",
        meta: { title: "折线图", noCache: true },
      },
    ],
  },

  // 下面配置会匹配所有path，匹配内容放入`$route.params.pathMatch`
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

// 路由守卫
const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  // 用户是否登录
  const hasToken = getToken();
  if (hasToken) {
    // 已登录
    if (to.path === "/login") {
      // 重定向至首页
      next({ path: "/" });
    } else {
      // 否则获取用户角色信息
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        // 以获取
        next();
      } else {
        // 为获取则发送请求获取角色
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch("user/getInfo");

          // generate accessible routes map based on roles
          store.dispatch("permission/generateRoutes", roles);

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true });
        } catch (error) {
          console.log(error);
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
    }
  }
});

export default router;
