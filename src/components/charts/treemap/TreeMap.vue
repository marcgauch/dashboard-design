<template>
  <el-card
    style="height: 100%; display: flex; flex-direction: column"
    body-style="display: flex; flex-direction: column; height: 100%;"
  >
    <template #header> Hiiitmap </template>
    <div class="container">
      <div id="chart">chart</div>
      <TreeMapBottomRow id="filter" />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useAnalyzeStore } from '@/stores/analyzeStore';
import TreeMapBottomRow from './TreeMapBottomRow.vue';
const props = defineProps({
  cardHeight: { type: String, required: true },
});

const analyzeStore = useAnalyzeStore();

analyzeStore.$subscribe(async () => {
  if (analyzeStore.isCalculating) return;
  console.log(analyzeStore.$state);
});
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
#chart {
  border: 1px solid salmon;
  flex-grow: 1;
}
</style>
