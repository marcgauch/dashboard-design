<template>
  <el-container style="max-height: calc(100vh - 59px)">
    <el-aside width="25vw">
      <TreeContainer></TreeContainer>
    </el-aside>
    <el-main style="border-left: 5px solid orchid">
      <pre>{{ treeStore.reportFile }}</pre>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import TreeContainer from '@/components/analyzer/tree/TreeContainer.vue';
import { useTreeStore } from '@/stores/treeStore';

const treeStore = useTreeStore();
</script>
