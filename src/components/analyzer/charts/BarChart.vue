<template>
  <Bar v-if="showChart" id="my-chart-id" :options="chartOptions" :data="chartData" />
  <pre>
    {{ chartOptions }}
  </pre>
  <pre>
    {{ chartData }}
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
  // https://stackoverflow.com/questions/44297428/chartjs-bar-chart-with-legend-which-corresponds-to-each-bar
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  datasets: [
    {
      backgroundColor: ['#f87979', '#00ff00'],
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
  ],
});

const chartOptions = reactive({
  responsive: true,
  maintainAspectRatios: false,
  plugins: {
    title: {
      display: true,
      text: 'Largest Files',
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
