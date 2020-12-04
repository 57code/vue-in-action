<template>
  <div>
    <message v-if="showMsg" @close="showMsg = false">
      <template v-slot:title> 恭喜 </template>
      <template v-slot:default> 新增课程成功！ </template>
    </message>

    <!-- 条件渲染 -->
    <p v-if="courses.length === 0">没有任何课程信息</p>

    <!-- 新增链接 -->
    <p>
      <!-- <router-link to="/course/add">新增</router-link> -->
      <button @click="$router.push('/course/add')">新增</button>
    </p>

    <!-- 列表渲染 -->
    <ul>
      <li
        v-for="c in courses"
        :key="c.id"
        :class="{ active: selectedCourse === c }"
        @click="showDetail(c)"
      >
        {{ c.name }}
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>
<script>
import { ref } from "vue";
import { getCourses } from "../api/course";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
export default {
  // data() {
  //   return {
  //     selectedCourse: "",
  //   };
  // },
  setup() {
    const courses = ref([]);
    getCourses().then(result => (courses.value = result));

    const selectedCourse = ref(null);
    const router = useRouter();
    const showDetail = c => {
      selectedCourse.value = c;

      // 跳转
      router.push({ name: "detail", params: { id: c.id } });
    };

    // 弹窗控制
    const showMsg = ref(false);
    onBeforeRouteUpdate((to, from, next) => {
      if (from.name === "add" && to.query.action === "success") {
        showMsg.value = true;
      }
      next();
    });
    return { courses, showDetail, selectedCourse, showMsg };
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
