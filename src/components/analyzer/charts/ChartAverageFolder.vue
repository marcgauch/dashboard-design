<template>
  <el-card>
    <template #header> Average folder </template>
    <BoxPlot :data="data" />
  </el-card>
</template>

<script setup lang="ts">
// absolutely stolen from https://github.com/sgratzl/chartjs-chart-boxplot/blob/main/samples/default_esm.html
import BoxPlot from '@/components/charts/BoxPlot.vue';
import { reactive } from 'vue';
const data = reactive({
  labels: ['Files', 'Size in MB', 'Directories'],
  datasets: [
    {
      label: 'a',
      color: '#0000FF',
      data: [
        [10, 10, 2],
        [2, 3, 4],
        [2, 3, 4],
      ],
    },
    {
      label: 'b',
      color: '#00FF00',
      data: [
        [10, 10, 2],
        [2, 3, 4],
        [2, 3, 4],
      ],
    },
  ],
});

setInterval(() => {
  data.datasets.at(0)!.data = [
    Array(100)
      .fill(0)
      .map(() => Math.random() * (Math.random() + Math.random())),
    Array(100)
      .fill(0)
      .map(() => Math.random() * (Math.random() + Math.random())),
    Array(100)
      .fill(0)
      .map(() => Math.random() * (Math.random() + Math.random())),
  ];
  data.datasets.at(1)!.data = [
    Array(100)
      .fill(0)
      .map(() => Math.random() * (Math.random() + Math.random())),
    Array(100)
      .fill(0)
      .map(() => Math.random() * (Math.random() + Math.random())),
    Array(100)
      .fill(0)
      .map(() => Math.random() * (Math.random() + Math.random())),
  ];
}, 2000);
</script>
