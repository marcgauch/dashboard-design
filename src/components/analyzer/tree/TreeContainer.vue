<template>
  <div class="fill">
    <TreeItem :item="treeStore.root" :indentation-level="0" :percentage-of-parent="100" />
  </div>
</template>

<script setup lang="ts">
import { useTreeStore } from '@/stores/treeStore';
import TreeItem from './TreeItem.vue';

const treeStore = useTreeStore();
</script>

<style scoped>
.fill {
  margin: 0.5rem;
  overflow-y: scroll;
}
</style>
