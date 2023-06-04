<template>
  <el-card style="position: relative; height: 100%" body-style="height: 100%">
    <template #header> Average folder </template>
    <BoxPlot :data="data" :show-label="true" />
  </el-card>
</template>

<script setup lang="ts">
// absolutely stolen from https://github.com/sgratzl/chartjs-chart-boxplot/blob/main/samples/default_esm.html
import BoxPlot from '@/components/charts/BoxPlot.vue';
import { reactive, watch } from 'vue';
import { useAnalyzeStore } from '@/stores/analyzeStore';

const analyzeStore = useAnalyzeStore();

const data = reactive({
  labels: ['Files', 'Directories'],
  datasets: [
    {
      label: 'current folder',
      color: '#00dd9b',
      data: [[0], [0]],
    },
    {
      label: 'all folders',
      color: '#ef2648',
      data: [[0], [0]],
    },
  ],
});
watch(
  // no need to check to watch analyzeStore.changeType since we are watching directrories only here
  () => analyzeStore.directories,
  () => {
    data.datasets[0].data = [
      analyzeStore.directories.map((e) => e.nFiles),
      analyzeStore.directories.map((e) => e.nDirectories),
    ];
  }
);
</script>
