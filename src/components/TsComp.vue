<template>
  <h2>{{ title }}</h2>
  <ul>
    <li v-for="course in courses" :key="course.id">
      {{ course.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
})

type Course = {
  id: number
  name: string
}

const courses = ref<Course[]>([{ id: 1, name: '开课吧全栈架构师' }])

fetch('/api/users')
  .then(resp => resp.json())
  .then(json => console.log(json))
</script>

<style scoped></style>
