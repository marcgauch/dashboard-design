<template>
  <el-card body-style="padding-top: 0.8rem; padding-bottom: 0.8rem;">
    <template #header>
      <TitleBreadcrumb />
    </template>
    <TheFilter />
  </el-card>
</template>

<script setup lang="ts">
import TheFilter from './TheFilter.vue';
import TitleBreadcrumb from './TitleBreadcrumb.vue';
</script>
