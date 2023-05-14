<template>
  <el-card :body-style="`min-height: ${cardHeight}; position: relative;`">
    <template #header> Average folder </template>
    <BoxPlot :data="data" :show-label="true" />
  </el-card>
</template>

<script setup lang="ts">
// absolutely stolen from https://github.com/sgratzl/chartjs-chart-boxplot/blob/main/samples/default_esm.html
import BoxPlot from '@/components/charts/BoxPlot.vue';
import { reactive, watch } from 'vue';
import { useAnalyzeStore } from '@/stores/analyzeStore';
import { useTreeStore } from '@/stores/treeStore';
import { UNIT, UTIL } from '@/services/Util';

const analyzeStore = useAnalyzeStore();
const treeStore = useTreeStore();

const props = defineProps({
  cardHeight: { type: String, required: true },
});

const data = reactive({
  labels: ['Files', 'Directories'],
  datasets: [
    {
      label: 'current folder',
      color: '#0000FF',
      data: [[0], [0]],
    },
    {
      label: 'all folders',
      color: '#00FF00',
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
