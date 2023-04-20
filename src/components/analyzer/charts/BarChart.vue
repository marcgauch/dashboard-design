<template>
  <el-card>
    <template #header> Largest files </template>
    <Bar v-if="showChart" id="my-chart-id" :options="chartOptions" :data="chartData" />
  </el-card>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue';
import { UTIL } from '@/services/Util';
import { useAnalyzeStore } from '@/stores/analyzeStore';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const analyzeStore = useAnalyzeStore();

analyzeStore.$subscribe(async () => {
  const largestFiles = analyzeStore.filesSortedBySize.slice(0, 10);

  const labels = [] as string[];
  const dataset = {
    data: [] as number[],
    backgroundColor: [] as string[],
  };

  largestFiles.forEach(({ name, size, icon }) => {
    labels.push(name);
    dataset.data.push(size);
    dataset.backgroundColor.push(UTIL.getColor(icon));
  });
  showChart.value = false;
  chartData.labels = labels;
  chartData.datasets = [dataset];
  await nextTick();
  showChart.value = true;
});

const chartData = reactive({
  labels: [] as string[],
  datasets: [
    {
      backgroundColor: [] as string[],
      data: [] as number[],
    },
  ],
});

const chartOptions = reactive({
  responsive: true,
  maintainAspectRatios: false,
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (tooltipItems: any) => {
          return [
            UTIL.calculateSize(tooltipItems.raw),
            analyzeStore.filesSortedBySize[tooltipItems.datasetIndex].fullPath,
          ];
        },
      },
    },
  },
});
const showChart = ref(true);
</script>
