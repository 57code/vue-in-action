<template>
  <!-- 表单输入 -->
  <input type="text" v-model="course" @keydown.enter="add" />
  <!-- 事件处理 -->
  <button v-on:click="add">新增课程</button>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { addCourse } from "../api/course";

export default {
  setup() {
    const course = ref("");
    const router = useRouter();
    const add = () => {
      addCourse(course.value);
      router.push({ path: "/course", query: { action: "success" } });
    };
    return { course, add };
  },
  // props: {
  //   // model-value
  //   course: {
  //     type: String,
  //     required: true,
  //   },
  // },
  // data() {
  //   return {
  //     course: ''
  //   }
  // },
  // emits: ["update:course", "add"],
  // methods: {
  //   addCourse() {
  //     this.$emit("add");
  //     // this.course = ''
  //   },
  // },
};
</script>
