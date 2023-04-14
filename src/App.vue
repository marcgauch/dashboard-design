<template>
  <header>
    <div>
      ICH BIN EIN TITEL
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
html,
body {
  width: 100vw;
  margin: 0;
}
</style>
