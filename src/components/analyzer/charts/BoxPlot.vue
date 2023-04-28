<template>
  <el-card>
    <template #header> Largest files </template>
    <!--<BoxPlotChart v-if="showChart" id="my-chart-id" :options="chartOptions" :data="chartData" />-->
    <canvas id="canvas"></canvas>
  </el-card>
</template>

<script setup lang="ts">
// absolutely stolen from https://github.com/sgratzl/chartjs-chart-boxplot/blob/main/samples/default_esm.html
import { BoxPlotChart } from '@sgratzl/chartjs-chart-boxplot';
import { onMounted } from 'vue';

onMounted(() => {
  const chart = new BoxPlotChart(document.getElementById('canvas') as HTMLCanvasElement, {
    data: {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          label: 'Test',
          data: [
            Array(100)
              .fill(0)
              .map(() => Math.random()),
          ],
        },
        {
          label: 'Test',
          data: [
            Array(100)
              .fill(0)
              .map(() => Math.random()),
          ],
        },
        {
          label: 'Test',
          data: [
            Array(100)
              .fill(0)
              .map(() => Math.random()),
          ],
        },
      ],
    },
  });
});
</script>
