<template>
  <div class="wrapper">
    <el-button class="copy-button" size="small" @click="copyToClipboard">{{
      buttonCaption
    }}</el-button>
    <pre>{{ text }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  text: string;
}>();

const buttonCaption = ref('Copy');

const copyToClipboard = () => {
  navigator.clipboard.writeText(props.text);
  buttonCaption.value = 'Copied';
  setTimeout(() => {
    buttonCaption.value = 'Copy';
  }, 2500);
};
</script>

<style scoped>
.wrapper {
  position: relative;
}

.copy-button {
  position: absolute;
  top: 0.25rem;
  right: 0.5rem;
}

pre {
  color: var(--el-color-white);
  background-color: var(--color-gray-600);
  border-radius: var(--el-border-radius-base);
  font-family: monospace;
  padding: 0.5rem 1rem;
  max-height: 5rem;
  overflow: auto;
}
</style>
