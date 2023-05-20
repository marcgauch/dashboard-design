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
          :remainingDepth="1"
          :display-row="true"
          @tooltip-change="tooltipChange"
        />
        <el-tooltip
          placement="top"
          ref="tooltipRef"
          :visible="tooltipVisible"
          :virtual-ref="targetRef"
          virtual-triggering
        >
          <template #content>
            <span>{{ tooltipMessage }}</span>
          </template>
        </el-tooltip>
      </div>
      <TreeMapBottomRow id="filter" />
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

const tooltipChange = (payload: { target: EventTarget; state: boolean; message: string }) => {
  console.log(payload);
  targetRef.value = payload.target;
  tooltipMessage.value = payload.message;
  tooltipVisible.value = payload.state;
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
  border: 1px solid salmon;
  flex-grow: 1;
  display: flex;
}
</style>
