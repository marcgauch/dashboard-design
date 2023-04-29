<template>
  <div>{{ combined }}</div>
</template>

<script setup lang="ts">
import { UTIL } from '@/services/Util';
const props = defineProps({
  size: { type: Number, required: true },
});

const { combined } = UTIL.calculateSize(props.size, true);
</script>
