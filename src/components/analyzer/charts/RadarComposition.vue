<template>
  <el-card style="height: 100%" body-style="position: relative;">
    <template #header>Composition of folder</template>
    <Radar v-if="showChart" :data="data" :options="options" />
  </el-card>
</template>

<script setup lang="ts">
import { Directory, ItemTypeIcon } from '@/models/models';
import { useAnalyzeStore } from '@/stores/analyzeStore';
import { useTreeStore } from '@/stores/treeStore';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { nextTick, reactive, ref } from 'vue';
import { Radar } from 'vue-chartjs';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const analyzeStore = useAnalyzeStore();
const treeStore = useTreeStore();
const showChart = ref(true);

analyzeStore.$subscribe(async () => {
  if (analyzeStore.isCalculating) return;
  // update labels
  showChart.value = false;
  const disabledTypes = analyzeStore.disabledItemTypes.map((e) => ItemTypeIcon[e]);
  const enabledTypes = LABELS.filter(({ type }) => !disabledTypes.includes(type));
  data.labels = enabledTypes.map((e) => e.label);
  // compute the sizes
  /// current folder
  data.datasets[0].data = calculateData(analyzeStore.analyzeDirectory, enabledTypes);
  /// all folders
  data.datasets[1].data = calculateData(treeStore.root, enabledTypes);
  await nextTick();
  showChart.value = true;
});

const calculateData = (directory: Directory, enabledTypes: { label: string; type: string }[]) => {
  const totalSize = directory.totalSize / 100;
  const totalContentSizes = { ...directory.totalContentSizes };
  return enabledTypes.map(({ type }) => Math.round(totalContentSizes[type] / totalSize));
};

const LABELS = [
  { label: 'Archive', type: 'ARCHIVE' },
  { label: 'Binary', type: 'BINARY' },
  { label: 'Disk Image', type: 'DISK_IMAGE' },
  { label: 'Document', type: 'DOCUMENT' },
  { label: 'Music', type: 'MUSIC' },
  { label: 'Picture', type: 'PICTURE' },
  { label: 'Video', type: 'VIDEO' },
  { label: 'Other', type: 'OTHER' },
];

const data = reactive({
  labels: LABELS.map((e) => e.label),
  datasets: [
    {
      label: 'current folder',
      backgroundColor: '#2bffc0',
      borderColor: '#00dd9b',
      pointBackgroundColor: '#00dd9b',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#00dd9b',
      data: [10, 10, 10, 10, 10, 10, 10, 10],
    },
    {
      label: 'all folders',
      backgroundColor: '#f46d84',
      borderColor: '#ef2648',
      pointBackgroundColor: '#ef2648',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#ef2648',
      data: [20, 20, 20, 20, 20, 20, 20, 20],
    },
  ],
});
const options = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
