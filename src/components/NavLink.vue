<template>
  <!-- 扩展router-link，使之可以处理外部链接 -->
  <a v-if="isExternal" :href="to" target="_blank" v-bind="$attrs">
    <slot></slot>
  </a>

  <!-- 内部链接 -->
  <router-link v-else v-bind="$attrs" :to="to">
    <slot></slot>
  </router-link>
</template>

<script>
import { computed } from "vue";
import { useLink, RouterLink } from "vue-router";

export default {
  props: {
    ...RouterLink.props,
  },
  setup(props) {
    const { route, href, isActive, isExactActive, navigate } = useLink(props);
    console.log(route, href, isActive, isExactActive, navigate);
    const isExternal = computed(() => {
      return typeof props.to === "string" && props.to.startsWith("http");
    });
    return { isExternal };
  },
};
</script>

<style scoped></style>
