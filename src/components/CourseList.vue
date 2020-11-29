<template>
  <!-- 条件渲染 -->
  <p v-if="courses.length === 0">没有任何课程信息</p>

  <!-- 新增链接 -->
  <p>
    <router-link to="/add">新增</router-link>
  </p>

  <!-- 列表渲染 -->
  <ul>
    <li
      v-for="c in courses"
      :key="c.id"
      :class="{ active: selectedCourse === c }"
      @click="selectedCourse = c"
    >
      <router-link :to="'/course/' + c.id">{{ c.name }}</router-link>
    </li>
  </ul>
</template>
<script>
import { ref } from "vue";
import { getCourses } from "../api/course";
export default {
  data() {
    return {
      selectedCourse: "",
    };
  },
  setup() {
    const courses = ref([]);
    getCourses().then(result => (courses.value = result));
    return { courses };
  },
  // props: {
  //   courses: {
  //     type: Array,
  //     required: true,
  //   },
  // },
};
</script>
<style scoped>
.active {
  background-color: #ccc;
}
</style>
