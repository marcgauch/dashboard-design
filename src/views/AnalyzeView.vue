<template>
  <el-container style="height: calc(100vh - 59px)">
    <el-aside :width="`${treeContainerWidth}px`">
      <TreeContainer></TreeContainer>
    </el-aside>
    <TheDivider @change="thedividerchanged" :default-width="400" />
    <el-main style="display: flex; flex-direction: column">
      <TheCharts />
    </el-main>
  </el-container>
  <TheBusyDialog />
</template>

<script setup lang="ts">
import TheBusyDialog from '@/components/TheBusyDialog.vue';
import TheCharts from '@/components/analyzer/charts/TheCharts.vue';
import TheDivider from '@/components/analyzer/tree/TheDivider.vue';
import TreeContainer from '@/components/analyzer/tree/TreeContainer.vue';
import { ref } from 'vue';
const treeContainerWidth = ref(400);

const thedividerchanged = (width: number) => {
  treeContainerWidth.value = width;
};
</script>
