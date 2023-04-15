<template>
  <el-card class="fill">
    <TreeItem :item="treeStore.root" :indentation-level="0" :percentage-of-parent="100" />
    <pre>{{ treeStore.root }}</pre>
  </el-card>
</template>

<script setup lang="ts">
import { useTreeStore } from '@/stores/treeStore';
import TreeItem from './TreeItem.vue';

const treeStore = useTreeStore();
</script>

<style scoped>
.fill {
  width: 100%;
  height: 99%;
  overflow-y: scroll;
}
</style>
