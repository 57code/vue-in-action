<template>
  <!-- 路由出口 -->
  <router-view></router-view>
</template>

<script>
import { ref } from "vue";
import request from "/utils/request";

async function getUsers() {
  const users = await request("/users");
  return users;
}

export default {
  setup() {
    return { users: ref(getUsers()) };
  },
};
</script>
