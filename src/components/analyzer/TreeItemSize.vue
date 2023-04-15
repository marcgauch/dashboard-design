<template>
  <div>{{ humanReadableSize }}</div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settingsStore';
const settings = useSettingsStore();

const props = defineProps({
  size: { type: Number, required: true },
});

const calculateSize = (size: number) => {
  if (size === 0) return '0 B';
  for (let i = 0; i < settings.TREE_ITEM_SIZE.UNITS.length; i++) {
    const newSize = size / settings.TREE_ITEM_SIZE.STEP_SIZE;
    if (newSize < 1) {
      if (i === 0) {
        // No decimals in bytes
        return `${size} ${settings.TREE_ITEM_SIZE.UNITS[0]}`;
      }
      return `${size.toFixed(settings.TREE_ITEM_SIZE.DECIMAL_PLACES)} ${
        settings.TREE_ITEM_SIZE.UNITS[i]
      }`;
    }
    size = newSize;
  }
  return settings.TREE_ITEM_SIZE.TEXT_WHEN_TOO_BIG;
};

const humanReadableSize = calculateSize(props.size);
</script>
