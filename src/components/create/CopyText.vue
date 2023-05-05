<template>
  <div class="wrapper">
    <el-button class="copy-button" @click="copyToClipboard">{{ buttonCaption }}</el-button>
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
  box-shadow: 10px 5px 5px red;
}

.copy-button {
  position: absolute;
  top: 0.25rem;
  right: 0.5rem;
}

pre {
  background-color: rgb(245, 204, 235);
  font-family: monospace;
  padding: 0.2rem 1rem;
  max-height: 5rem;
  overflow: auto;
}
</style>
