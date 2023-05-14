<template>
  <canvas id="canvas"></canvas>
</template>

<script setup lang="ts">
// absolutely stolen from https://github.com/sgratzl/chartjs-chart-boxplot/blob/main/samples/default_esm.html and transformed quite a bit
import { BoxPlotChart } from '@sgratzl/chartjs-chart-boxplot';
import { onMounted, watch } from 'vue';

const props = defineProps<{
  data: {
    labels: Array<string>;
    datasets: Array<{
      label: string;
      color: string;
      data: Array<Array<number>>;
    }>;
  };
  showLabel?: boolean;
}>();

let chart: BoxPlotChart;

const createDatasets = () =>
  props.data.datasets.map(({ label, color, data }) => ({
    label,
    data,
    backgroundColor: color,
    borderColor: color,
  }));

watch(props.data, () => {
  chart.data.labels = props.data.labels;
  chart.data.datasets = createDatasets();
  chart.update();
});

onMounted(() => {
  chart = new BoxPlotChart(document.getElementById('canvas') as HTMLCanvasElement, {
    data: {
      labels: props.data.labels,
      datasets: createDatasets(),
    },
    options: {
      plugins: {
        legend: {
          display: props.showLabel,
        },
      },
    },
  });
});
</script>
