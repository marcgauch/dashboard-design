<template>
  <div class="fill">
    <TreeItem
      style="border: 1px solid orange"
      :item="treeStore.root"
      :indentation-level="0"
      :percentage-of-parent="100"
    />
  </div>
</template>

<script setup lang="ts">
import { useTreeStore } from '@/stores/treeStore';
import TreeItem from './TreeItem.vue';

const treeStore = useTreeStore();
</script>

<style scoped>
.fill {
  margin: 1.1rem;
  overflow-y: scroll;
}
</style>
