<template>
  <el-card :body-style="`min-height: ${cardHeight}; position: relative;`">
    <template #header>Most common foldernames</template>
    <Bar v-if="showChart" id="my-chart-id" :options="chartOptions" :data="chartData" />
  </el-card>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue';
import { ChangeType, useAnalyzeStore } from '@/stores/analyzeStore';
import { useSettingsStore } from '@/stores/settingsStore';
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

const props = defineProps({
  cardHeight: { type: String, required: true },
});

const analyzeStore = useAnalyzeStore();
const settingsStore = useSettingsStore();

analyzeStore.$subscribe(async () => {
  if (analyzeStore.isCalculating) return;
  if (analyzeStore.changeType !== ChangeType.DIRECTORY) return;
  const labels = [] as string[];
  const data = [] as number[];

  analyzeStore.directoryNames.forEach(({ name, value }) => {
    labels.push(name);
    data.push(value);
  });
  showChart.value = false;
  chartData.labels = labels;
  chartData.datasets[0].data = data;
  await nextTick();
  showChart.value = true;
});

const chartData = reactive({
  labels: [] as string[],
  datasets: [
    {
      backgroundColor: settingsStore.TREE_BAR_COLOR,
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
  },
});
const showChart = ref(true);
</script>
