<template>
  <img src="./assets/logo.png" />
  <p>{{ title }}</p>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      title: ref('kvite nb'),
    }
  },
}
</script>
