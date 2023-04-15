<template>
  <el-container style="height: 100%">
    <el-aside width="25vw">
      <TreeContainer></TreeContainer>
    </el-aside>
    <el-main>
      <pre>{{ treeStore.reportFile }}</pre>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import TreeContainer from '@/components/analyzer/tree/TreeContainer.vue';
import { useTreeStore } from '@/stores/treeStore';

const treeStore = useTreeStore();
</script>
