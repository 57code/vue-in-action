<template>
  <!-- ts˝ -->
  <!-- <Compts></Compts> -->
  <!-- 相对地址 -->
  <!-- <img src="./assets/logo.png" alt=""> -->
  <!-- 绝对路径 -->
  <!-- <img src="/src/assets/logo.png" alt=""> -->
  <!-- 消息提示框 -->
  <!-- <message v-if="showMsg" @close="showMsg = false">
    <template v-slot:title> 恭喜 </template>
    <template v-slot:default> 新增课程成功！ </template>
  </message>

  <course-add v-model:course="course" @add="addCourse"></course-add>

  <course-list :courses="courses"></course-list> -->

  <!-- 计算属性：课程总数 -->
  <!-- <p>课程总数：{{ courseCount }}</p> -->
  <!-- 路由出口 -->
  <router-view></router-view>
</template>

<script>
import { reactive, onMounted, ref, toRefs, computed, watch } from "vue";
export default {
  setup() {
    const state = reactive({
      courses: JSON.parse(localStorage.getItem("courses")) || [],
      course: "",
      courseCount: computed(() => state.courses.length + "门"),
    });

    const showMsg = ref(false);

    function addCourse() {
      state.courses.push(state.course);
      state.course = "";

      showMsg.value = true;
    }

    onMounted(() => {
      setTimeout(() => {
        state.courses = ["web全栈架构师", "web高级工程师"];
      }, 1000);

      watch(
        () => state.courses,
        () => {
          localStorage.setItem("courses", JSON.stringify(state.courses));
        },
        {
          deep: true,
        }
      );
    });

    fetch("/api/users")
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
      });

    console.log(import.meta.env.VITE_TOKEN);

    return { ...toRefs(state), showMsg, addCourse };
  },
};
</script>
