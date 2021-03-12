<template>
  <img src="@/assets/logo.png" />
  <div class="img-logo"></div>
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <TsComp title="我的课程"></TsComp>
</template>

<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import TsComp from "@/components/TsComp.vue";
import "./index.css";
import classes from "./App.module.css";

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>
<style module>
.logo {
  border: 1px solid #000;
}
</style>
<style scoped>
.img-logo {
  background-image: url(@/assets/logo.png);
  width: 200px;
  height: 200px;
}
</style>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>