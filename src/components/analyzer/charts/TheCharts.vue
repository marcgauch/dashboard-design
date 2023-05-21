<template>
  <el-row>
    <el-col>
      <TheTitle />
    </el-col>
  </el-row>
  <el-row :gutter="8" style="display: flex; flex: 5; margin-top: 8px; margin-bottom: 8px">
    <el-col :span="18">
      <TreeMap />
    </el-col>
    <el-col :span="6">
      <RadarComposition />
    </el-col>
  </el-row>
  <el-row :gutter="8" style="display: flex; flex: 1; flex-basis: 0%">
    <el-col :span="8">
      <BarChartAmountOfFoldertypes />
    </el-col>
    <el-col :span="8">
      <BarChartLargestFiles />
    </el-col>
    <el-col :span="8">
      <ChartAverageFolder />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import TheTitle from '../titleWithFilter/TheTitle.vue';
import BarChartAmountOfFoldertypes from '@/components/analyzer/charts/BarChartAmountOfFoldertypes.vue';
import BarChartLargestFiles from '@/components/analyzer/charts/BarChartLargestFiles.vue';
import ChartAverageFolder from '@/components/analyzer/charts/ChartAverageFolder.vue';
import RadarComposition from './RadarComposition.vue';
import TreeMap from '@/components/charts/treemap/TreeMap.vue';
</script>

<style scoped></style>
