<template>
  <div>{{ humanReadableSize }}</div>
</template>

<script setup lang="ts">
const props = defineProps({
  size: { type: Number, required: true },
});

const calculateSize = (size: number) => {
  const STEP_SIZE = 1024;
  const DECIMAL_PLACES = 2;
  const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  if (size === 0) return '0 B';
  for (let i = 0; i < UNITS.length; i++) {
    const newSize = size / STEP_SIZE;
    if (newSize < 1) {
      if (i === 0) {
        // No decimals in bytes
        return `${size} ${UNITS[0]}`;
      }
      return `${size.toFixed(DECIMAL_PLACES)} ${UNITS[i]}`;
    }
    size = newSize;
  }
  return 'much';
};

const humanReadableSize = calculateSize(props.size);
</script>
