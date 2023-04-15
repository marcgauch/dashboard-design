<template>
  <pre>{{ treeStore.reportFile }}</pre>
</template>

<script setup lang="ts">
import { useTreeStore } from '@/stores/treeStore';

const treeStore = useTreeStore();
</script>
