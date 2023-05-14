<template>
  <div class="outer">
    <div class="inner">
      <TreeItem :item="treeStore.root" :indentation-level="0" :percentage-of-parent="100" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTreeStore } from '@/stores/treeStore';
import TreeItem from './TreeItem.vue';

const treeStore = useTreeStore();
</script>

<style scoped>
.outer {
  height: 100%;
  overflow: hidden;
  background-color: var(--color-gray-300);
}
.inner {
  padding: 0.5rem;
  height: 98%;
  overflow-y: scroll;
}
</style>
