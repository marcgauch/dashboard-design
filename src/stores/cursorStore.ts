import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCursorStore = defineStore('cursor', () => {
  const x = ref();
  const y = ref();
  const updatePosition = (xPos: number, yPos: number) => {
    x.value = xPos;
    y.value = yPos;
  };
  return { x, y, updatePosition };
});
