<template>
  <div @mousemove="updateCursorStore">
    <TheNavigation />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheNavigation from '@/components/TheNavigation.vue';
import { useCursorStore } from '@/stores/cursorStore';
const cursorStore = useCursorStore();

const updateCursorStore = (event: MouseEvent) => {
  cursorStore.updatePosition(event.clientX, event.clientY);
};
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
