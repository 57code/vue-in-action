<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container" />
    <!-- 内容容器 -->
    <div class="main-container">
      <!-- 顶部导航栏 -->
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import AppMain from "./components/AppMain.vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar/index.vue";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
  setup() {
    const store = useStore();
    const sidebar = computed(() => store.state.app.sidebar);
    const fixedHeader = computed(() => store.state.app.settings.fixedHeader);
    const classObj = computed(() => ({
      hideSidebar: !sidebar.value.opened,
      openSidebar: sidebar.value.opened,
      withoutAnimation: sidebar.value.withoutAnimation,
    }));
    return { classObj, fixedHeader };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/mixin.scss";
@import "../styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 50px);
}
</style>
