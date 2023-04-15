<template>
  <TheNavigation />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheNavigation from '@/components/TheNavigation.vue';
</script>

<style>
html,
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}
#app {
  height: 100vh;
}
</style>
