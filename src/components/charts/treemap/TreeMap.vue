<template>
  <el-card
    style="height: 100%; display: flex; flex-direction: column"
    body-style="display: flex; flex-direction: column; height: 100%;"
  >
    <template #header> Hiiitmap </template>
    <div>
      <el-button
        v-for="i in 3"
        :key="i"
        @mouseover="(e:any) => (buttonRef = e.currentTarget)"
        @click="visible = !visible"
        >Click to open tooltip</el-button
      >
    </div>
    <div class="container">
      <div id="chart">
        <TreeMapArea
          :directory="analyzeDirectory"
          :remainingDepth="1"
          :display-row="true"
          @tooltip-visibility-change="tooltipVisibilityChange"
        />
        <el-tooltip ref="tooltipRef" :visible="visible" :virtual-ref="buttonRef" virtual-triggering>
          <template #content>
            <span> Some content </span>
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

const buttonRef = ref();
const tooltipRef = ref();

const visible = ref(false);

const tooltipVisibilityChange = (value: { state: boolean; target: EventTarget }) => {
  console.log(value);
  buttonRef.value = value.target;
  visible.value = value.state;
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
