<template>
  <div :class="$style.messageBox">
    <h3>
      <!-- 具名插槽 -->
      <slot name="title"></slot>
      <span :class="$style.messageBoxClose" @click="$emit('close')">X</span>
    </h3>
    <!-- 匿名插槽 -->
    <slot></slot>
  </div>
</template>
<script>
export default {
  emits: ["close"],
};
</script>

<!-- 消息组件 -->
<style module>
.message-box {
  padding: 10px 20px;
  background: #4fc08d;
  border: 1px solid #42b983;
  color: #fff;
}

.message-box-close {
  float: right;
  cursor: pointer;
}
</style>
