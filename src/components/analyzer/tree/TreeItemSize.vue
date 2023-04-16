<template>
  <div>{{ humanReadableSize }}</div>
</template>

<script setup lang="ts">
import { UTIL } from '@/services/Util';
const props = defineProps({
  size: { type: Number, required: true },
});

const humanReadableSize = UTIL.calculateSize(props.size);
</script>
