<template>
  <el-card
    style="height: 100%; display: flex; flex-direction: column"
    body-style="display: flex; flex-direction: column; height: 100%;"
  >
    <template #header> Hiiitmap </template>
    <div class="container">
      <div id="chart" @mouseleave="tooltipVisible = false">
        <TreeMapArea
          :directory="analyzeDirectory"
          :remainingDepth="4"
          :display-row="true"
          :filter="typeFilter"
          @tooltip-change="tooltipChanged"
          :key="`${analyzeDirectory.fullPath}-${JSON.stringify(typeFilter)}`"
        />
        <el-tooltip
          placement="top"
          ref="tooltipRef"
          :visible="tooltipVisible"
          :virtual-ref="targetRef"
          virtual-triggering
          :content="tooltipMessage"
          raw-content
        >
        </el-tooltip>
      </div>
      <TreeMapBottomRow id="filter" @change="filterChanged" />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useAnalyzeStore } from '@/stores/analyzeStore';
import TreeMapArea from './TreeMapArea.vue';
import TreeMapBottomRow from './TreeMapBottomRow.vue';
import { ref } from 'vue';
import { Directory } from '@/models/models';
const props = defineProps({
  cardHeight: { type: String, required: true },
});

const analyzeStore = useAnalyzeStore();
const analyzeDirectory = ref(new Directory('', 0, ''));

const targetRef = ref();
const tooltipRef = ref();
const tooltipMessage = ref('');

const tooltipVisible = ref(false);

const typeFilter = ref({ left: [] as string[], right: [] as string[] });

const tooltipChanged = (payload: { target: EventTarget; state: boolean; message: string }) => {
  //console.log(payload);
  targetRef.value = payload.target;
  tooltipMessage.value = payload.message;
  tooltipVisible.value = payload.state;
};

const filterChanged = (filter: { left: string[]; right: string[] }) => {
  typeFilter.value = filter;
};

analyzeStore.$subscribe(async () => {
  if (analyzeStore.isCalculating) return;
  console.log(analyzeDirectory);
  analyzeDirectory.value = analyzeStore.analyzeDirectory;
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
  flex: 1;
  display: flex;
}
</style>
