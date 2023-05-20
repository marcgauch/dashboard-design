<template>
  <div
    :class="displayRow ? 'row' : 'column'"
    :style="`padding: 10px; background-color: ${randomColor()}`"
    @mouseover="startTooltopVisibilityChange"
  >
    <div v-if="remainingDepth >= 0" class="area">
      <TreeMapArea
        v-for="dir in directory.contents.filter(e => e.isDirectory) as Directory[]"
        :directory="dir"
        :remainingDepth="remainingDepth - 1"
        :display-row="!displayRow"
        @tooltip-visibility-change="tooltipVisibilityChange"
      />
    </div>
    <div v-else class="area"></div>
  </div>
</template>

<script setup lang="ts">
import { Directory } from '@/models/models';

const props = defineProps({
  directory: { type: Directory, required: true },
  remainingDepth: { type: Number, required: true },
  displayRow: { type: Boolean, required: true },
});

const emits = defineEmits<{
  (e: 'tooltipVisibilityChange', value: { state: boolean; target: EventTarget }): void;
}>();

const startTooltopVisibilityChange = (e: MouseEvent) => {
  e.stopPropagation();
  tooltipVisibilityChange({ state: true, target: e.currentTarget! });
};

const tooltipVisibilityChange = (value: { state: boolean; target: EventTarget }) => {
  emits('tooltipVisibilityChange', { state: value.state, target: value.target });
};
/*
const tooltipVisibilityChangebak = (state: boolean, e: Event) => {
  emits('tooltipVisibilityChange', { state: true, target: e.currentTarget });
};
*/

const randomColor = () => {
  const number = 60 * props.remainingDepth;
  return `rgb(${number},${number},${number})`;
};
</script>

<style scoped>
.area {
  border: 1px solid turquoise;
  display: flex;
  flex-grow: 1;
}
.row {
  display: flex;
  flex-grow: 1;
  flex-direction: row;
}
.column {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}
</style>
