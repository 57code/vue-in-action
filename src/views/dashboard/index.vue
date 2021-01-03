<template>
  <div>
    <h3>dashboard</h3>
    <el-button v-permission="['admin']">admin</el-button>
    <el-button v-permission="['editor']">editor</el-button>
    <el-button v-permission="['admin', 'editor']">admin+editor</el-button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
