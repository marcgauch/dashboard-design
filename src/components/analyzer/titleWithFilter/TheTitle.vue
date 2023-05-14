<template>
  <el-card body-style="padding-top: 0.8rem; padding-bottom: 0.8rem;">
    <template #header>
      You are watching <el-text tag="b">{{ analyzeStore.directoryPath }}</el-text> in detail
    </template>
    <TheFilter />
  </el-card>
</template>

<script setup lang="ts">
import TheFilter from './TheFilter.vue';
import { useAnalyzeStore } from '@/stores/analyzeStore';

const analyzeStore = useAnalyzeStore();
</script>
