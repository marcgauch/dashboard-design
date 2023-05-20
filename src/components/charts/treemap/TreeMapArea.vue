<template>
  <div
    :class="displayRow ? 'row' : 'column'"
    :style="`padding: 20px; background-color: ${randomColor()}`"
    @mouseover="startTooltipChange"
  >
    <div v-if="remainingDepth > 0" class="area">
      <TreeMapArea
        v-for="dir in directory.contents.filter(e => e.isDirectory) as Directory[]"
        :directory="dir"
        :remainingDepth="remainingDepth - 1"
        :display-row="!displayRow"
        @tooltip-change="tooltipChange"
      />
    </div>
    <div v-else class="area">other</div>
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
  (e: 'tooltipChange', payload: { target: EventTarget; state: boolean; message: string }): void;
}>();

const startTooltipChange = (e: MouseEvent) => {
  e.stopPropagation();
  tooltipChange({ target: e.currentTarget!, state: true, message: props.directory.fullPath });
};

const tooltipChange = (payload: { target: EventTarget; state: boolean; message: string }) => {
  emits('tooltipChange', payload);
};

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
