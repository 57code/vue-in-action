<template>
  <div>
    <ul>
      <li v-for="c in courses" :key="c.id">{{ c.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface Course {
  id: number;
  name: string;
}

export default defineComponent({
  setup() {
    const courses = ref<Course[]>([]);

    setTimeout(() => {
      courses.value.push({ id: 1, name: "全栈架构师" });
    }, 1000);

    return { courses };
  },
});
</script>

<style scoped></style>
