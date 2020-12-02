<template>
  <div>
    <h3>{{ course.name }}</h3>
    <p>id:{{ $route.params.id }}</p>
    <p>price:{{ course.price }}</p>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { getCourseById } from "../api/course";
import { useRoute } from "vue-router";

export default {
  setup() {
    const course = ref({ name: "", price: "" });
    const route = useRoute();
    // console.log(route.params.id);
    getCourseById(route.params.id).then(ret => {
      course.value = ret;
    });

    // 检测参数变化
    watch(
      () => route.params,
      () => {
        getCourseById(route.params.id).then(ret => {
          course.value = ret;
        });
      }
    );

    return { course };
  },
};
</script>

<style scoped></style>
