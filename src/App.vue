<template>
  <TheNavigation />
  <header>
    <div></div>
  </header>

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
  margin: 0;
}
</style>
