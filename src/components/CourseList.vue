<template>
  <!-- 条件渲染 -->
  <p v-if="courses.length === 0">没有任何课程信息</p>
  <!-- 列表渲染 -->
  <ul>
    <li
      v-for="c in courses"
      :key="c"
      :class="{ active: selectedCourse === c }"
      @click="selectedCourse = c"
    >
      {{ c }}
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      selectedCourse: "",
    };
  },
  props: {
    courses: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>
.active {
  background-color: #ccc;
}
</style>
