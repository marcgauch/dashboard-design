<template>
  <Bar v-if="showChart" id="my-chart-id" :options="chartOptions" :data="chartData" />
  <pre>
    {{ chartOptions }}
  </pre>
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
  let labels = [] as string[];
  let data = [] as number[];
  largestFiles.forEach((f) => {
    labels.push(f.name);
    data.push(f.size);
  });
  showChart.value = false;
  chartData.labels = labels;
  chartData.datasets[0].data = data;
  await nextTick();
  showChart.value = true;
});

const chartData = reactive({
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }],
});

const chartOptions = reactive({
  responsive: true,
  maintainAspectRatios: false,
  plugins: {
    title: {
      display: true,
      text: 'Largest Files',
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
const showChart = ref(false);
</script>
