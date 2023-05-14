<template>
  <el-row>
    <el-col>
      <TheTitle />
    </el-col>
  </el-row>
  <el-row :gutter="8" style="display: flex; flex-grow: 1">
    <el-col :span="12">
      <BarChartLargestFiles card-height="16rem" />
    </el-col>
    <el-col :span="12">
      <BarChartAmountOfFoldertypes card-height="16rem" />
    </el-col>
  </el-row>
  <el-row :gutter="8" style="display: flex; flex-grow: 1">
    <el-col :span="8">
      <ChartAverageFolder card-height="8rem" />
    </el-col>
    <el-col :span="8">
      <RadarComposition card-height="8rem" />
    </el-col>
    <el-col :span="8">
      <BarChartLargestFiles card-height="8rem" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import TheTitle from '../titleWithFilter/TheTitle.vue';
import BarChartAmountOfFoldertypes from '@/components/analyzer/charts/BarChartAmountOfFoldertypes.vue';
import BarChartLargestFiles from '@/components/analyzer/charts/BarChartLargestFiles.vue';
import ChartAverageFolder from '@/components/analyzer/charts/ChartAverageFolder.vue';
import RadarComposition from './RadarComposition.vue';
</script>

<style scoped></style>
