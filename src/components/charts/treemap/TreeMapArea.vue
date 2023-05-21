<template>
  <div
    :class="displayRow ? 'row' : 'column'"
    class="flex"
    :style="`background-color: ${color}; padding: ${remainingDepth + 2}px`"
    @mouseover="startTooltipChange"
    @click.right.prevent="openContextMenu"
  >
    <TreeMapArea
      v-if="remainingDepth > 0"
      :key="directory.fullPath"
      v-for="dir in directory.contents.filter(e => e.isDirectory) as Directory[]"
      :directory="dir"
      :remainingDepth="remainingDepth - 1"
      :display-row="!displayRow"
      :filter="filter"
      @tooltip-change="tooltipChange"
    />
  </div>
</template>

<script setup lang="ts">
import { Directory } from '@/models/models';
import { UTIL } from '@/services/Util';
import { useAnalyzeStore } from '@/stores/analyzeStore';
import ContextMenu from '@imengyu/vue3-context-menu';
import { ref, watch } from 'vue';

const props = defineProps({
  directory: { type: Directory, required: true },
  remainingDepth: { type: Number, required: true },
  displayRow: { type: Boolean, required: true },
  filter: { type: Object, required: true },
});

watch(
  () => props,
  () => {
    calculateColorAndAmount();
  }
);
const analyzeStore = useAnalyzeStore();
const color = ref('#000');
const message = ref('');
const emits = defineEmits<{
  (e: 'tooltipChange', payload: { target: EventTarget; state: boolean; message: string }): void;
}>();

const startTooltipChange = (e: MouseEvent) => {
  e.stopPropagation();
  tooltipChange({ target: e.currentTarget!, state: true, message: message.value });
};

const tooltipChange = (payload: { target: EventTarget; state: boolean; message: string }) => {
  emits('tooltipChange', payload);
};

const calculateColorAndAmount = () => {
  const sumLeft = props.filter.left.reduce(
    (acc: string, cur: string) => acc + props.directory.totalContentSizes[cur],
    0
  );
  const sumRight = props.filter.right.reduce(
    (acc: number, cur: string) => acc + props.directory.totalContentSizes[cur],
    0
  );
  let relation = 0;
  if (sumLeft === sumRight) {
    relation = 0.5;
  } else if (sumLeft === 0) {
    relation = 1;
  } else if (sumRight === 0) {
    relation = 0;
  } else {
    relation = sumLeft / (sumLeft + sumRight);
  }

  const blue = Math.round(relation * 255);
  const red = 255 - blue;
  color.value = `rgb(${red},0,${blue})`;
  message.value = `${props.directory.fullPath}<br />Left: ${
    UTIL.calculateSize(sumLeft).combined
  } [${Math.round(relation * 100)}%]<br />Right: ${
    UTIL.calculateSize(sumRight).combined
  } [${Math.round((1 - relation) * 100)}%]`;
};
const openContextMenu = (e: MouseEvent) => {
  // https://github.com/imengyu/vue3-context-menu
  e.preventDefault();
  e.stopPropagation();
  //show your menu
  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    theme: 'mac',
    items: [
      {
        label: 'Set as analyze directory',
        onClick: () => {
          analyzeStore.setDirectory(props.directory);
        },
      },
    ],
  });
};

calculateColorAndAmount();
</script>

<style scoped>
.flex {
  display: flex;
  flex: 1;
}
.row {
  flex-direction: row;
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid white;
}
.row:last-child {
  border-bottom: 1px solid white;
}
.column {
  flex-direction: column;
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-bottom: 1px solid white;
}
.column:last-child {
  border-right: 1px solid white;
}
</style>
