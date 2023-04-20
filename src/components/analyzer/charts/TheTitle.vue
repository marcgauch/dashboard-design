<template>
  <el-card>
    <template #header> You are watching {{ analyzeStore.directoryPath }} in detail </template>
    <TheFilter />
  </el-card>
</template>

<script setup lang="ts">
import TheFilter from './TheFilter.vue';
import { useAnalyzeStore } from '@/stores/analyzeStore';

const analyzeStore = useAnalyzeStore();
</script>
