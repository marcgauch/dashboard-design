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
  let labels = [] as string[];
  let data = [] as number[];
  let backgroundColor = [] as string[];
  chartData.datasets = [];
  largestFiles.forEach((f) => {
    labels.push(f.name);
    data.push(f.size);
    backgroundColor.push(UTIL.getColor(f.icon));
    chartData.datasets.push();
  });
  showChart.value = false;
  chartData.labels = labels;
  chartData.datasets[0].data = data;
  chartData.datasets[0].backgroundColor = backgroundColor;

  await nextTick();
  showChart.value = true;
});

const chartData = reactive({
  // https://stackoverflow.com/questions/44297428/chartjs-bar-chart-with-legend-which-corresponds-to-each-bar
  labels: ['1aaaaaaaaaaaaaaaaaaaaaaaaa', '2', '3', '4', '5', '6', '7', '8'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [9, 0, 0, 0, 0, 4, 0, 9],
      backgroundColor: '#D6E9C6',
      stack: 'Stack 0',
    },
    {
      label: 'Dataset 2',
      data: [0, 12, 3, 0, 0, 0, 8, 0],
      backgroundColor: '#FAEBCC',
      stack: 'Stack 0',
    },
    {
      label: 'Dataset 3',
      data: [0, 0, 0, 4, 20, 0, 0, 0],
      backgroundColor: '#EBCCD1',
      stack: 'Stack 0',
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
      display: true,
      title: { display: true, text: 'Legendentitel' },
      labels: {
        color: 'rgb(255, 99, 132)',
      },
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
