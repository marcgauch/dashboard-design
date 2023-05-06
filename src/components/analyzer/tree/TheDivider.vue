<template>
  <div class="divider" @mousedown="mousedown" @mouseup="mouseup" @click="snap">
    <div class="divider-line"></div>
    <div class="divider-button"><MoreFilled /></div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { MoreFilled } from '@element-plus/icons-vue';
import { useCursorStore } from '@/stores/cursorStore';
const cursorStore = useCursorStore();

const emits = defineEmits<{ (e: 'change', value: number): void }>();
const props = defineProps<{ defaultWidth: number }>();

let updateInterval: number;
const state = reactive({
  width: props.defaultWidth,
  startWidth: props.defaultWidth,
});

const snap = () => {
  // forbid snapping when moved by user
  console.log(props.defaultWidth);
  if (Math.abs(state.width - state.startWidth) > 20) return;
  if (state.width < props.defaultWidth * 0.8) {
    state.width = props.defaultWidth;
  } else {
    state.width = 0;
  }
  emitSize();
};

const mousedown = () => {
  state.startWidth = state.width;
  clearInterval(updateInterval);
  updateInterval = setInterval(() => {
    state.width = cursorStore.x;
    emitSize();
  }, 20);
};
const mouseup = () => {
  clearInterval(updateInterval);
};

const emitSize = () => {
  emits('change', state.width);
};
</script>

<style scoped>
.divider {
  position: relative;

  cursor: ew-resize;
}
.divider-line {
  border-left: 0.2rem solid var(--lt-color-gray-400);
  border-right: 0.2rem solid var(--lt-color-gray-400);
  position: relative;
  height: 100%;
}
.divider-button {
  position: absolute;
  top: 45%;
  left: -0.5rem;
  width: 1.2rem;
  border: 1px solid var(--lt-color-gray-600);
  border-radius: 0.8rem;
  height: 4rem;
  background-color: var(--lt-color-gray-200);
  align-items: center;
  display: flex;
}
</style>
