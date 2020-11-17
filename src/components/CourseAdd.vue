<template>
  <!-- 表单输入 -->
  <input
    type="text"
    :value="course"
    @input="$emit('update:course', $event.target.value)"
    @keydown.enter="addCourse"
  />
  <!-- 事件处理 -->
  <button v-on:click="addCourse">新增课程</button>
</template>
<script>
export default {
  props: {
    // model-value
    course: {
      type: String,
      required: true,
    },
  },
  // data() {
  //   return {
  //     course: ''
  //   }
  // },
  emits: ["update:course", "add"],
  methods: {
    addCourse() {
      this.$emit("add");
      // this.course = ''
    },
  },
};
</script>
