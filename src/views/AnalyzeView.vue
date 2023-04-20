<template>
  <el-container style="max-height: calc(100vh - 59px)">
    <el-aside width="25vw">
      <TreeContainer></TreeContainer>
    </el-aside>
    <el-main style="border-left: 5px solid orchid">
      <TheCharts />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import TheCharts from '@/components/analyzer/charts/TheCharts.vue';
import TreeContainer from '@/components/analyzer/tree/TreeContainer.vue';
</script>
